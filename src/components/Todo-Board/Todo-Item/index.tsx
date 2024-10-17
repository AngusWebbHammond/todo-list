import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { 
  Edge,
  attachClosestEdge,
  extractClosestEdge
 } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { flushSync } from 'react-dom';
import { DropTargetRecord } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { TodoType } from '../../../types';
import DeleteButton from '../Delete-Button';
import EditButton from '../Edit-Button';


type Props = {
  todoItemDict: TodoType,
  h3TextStyling: string,
  h4TextStyling: string,
  deleteTodoItem: (id: string) => void,
  index: number,
  setData: (data: TodoType[]) => void,
  data: TodoType[],
  isTitleUpdating: boolean,
  setIsTitleUpdating: (isTitleUpdating: boolean) => void,
}

const TodoItem = (props: Props) => {
  // Drag and Drop Hooks
  const todoItemRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(props.todoItemDict.title);
  const [tempDescription, setTempDescription] = useState<string>(props.todoItemDict.description);

  const id: string = props.todoItemDict.id;
  const title: string = props.todoItemDict.title;
  const type: string = props.todoItemDict.type;
  const index: number = props.index;

  useEffect(() => {
    const element: HTMLDivElement | null = todoItemRef.current;
    invariant(element);
      
    return combine(
      draggable({
        element: element,
        getInitialData: () => ({ id, title, type, dragType: "todo-item" }),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      }), 
      dropTargetForElements({
        element: element,
        onDragStart: (args) => {
          if (args.source.data.dragType !== "todo-item") {
            return;
          }
          setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDragEnter: (args) => {
          if (args.source.data.dragType !== "todo-item") {
            return;
          }
          setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDrag: (args) => {
          if (closestEdge) {
            return;
          }

          if (args.source.data.dragType !== "todo-item") {
            return;
          }
          
          setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
        getData: ({input, element}) => {
          const data: {id: string, type: string, index: number} = { 
            id, type, index 
          };

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['top', 'bottom']
          })
        },
      }),
      monitorForElements({
        onDrop: ({location, source}) => {
          const target: DropTargetRecord = location.current.dropTargets[0];
          if (!target) {
            return;
          }

          const sourceData: Record<string, unknown> = source.data;
          const targetData: Record<string, unknown> = target.data;

          if (!sourceData || !targetData) {
            return;
          }

          if (!sourceData.id || !targetData.id) {
            return;
          }

          const indexOfSource: number = props.data.findIndex((item) => item.id === sourceData.id);
          const indexOfTarget: number = props.data.findIndex((item) => item.id === targetData.id);

          if (indexOfTarget < 0 || indexOfSource < 0) {
            return;
          }

          const tempArr: TodoType[] = props.data;
          tempArr[indexOfSource].type = tempArr[indexOfTarget].type;
          const closestEdgeOfTarget: Edge | null = extractClosestEdge(targetData)

          flushSync(() => {
            props.setData(
              reorderWithEdge({
                list: props.data,
                startIndex: indexOfSource,
                indexOfTarget,
                closestEdgeOfTarget,
                axis: 'vertical',
              }),
            );
          });
        }
      })
    )
  }, [id, title, type, index, props.data]);

  const updateTitle = (newTitle: string, newDescription: string, index: number) => {
    const tempArr = props.data;
    tempArr[index].title = newTitle;
    tempArr[index].description = newDescription;
    setIsEditing(false);
    props.setIsTitleUpdating(!props.isTitleUpdating);
  }

  return (
    <>
      <div 
        className={`bg-gray-300 dark:bg-slate-600 relative rounded-md gap-2 flex justify-between pl-3 pr-4 min-h-[5rem] ring-2 ring-slate-700 py-3 
          ${dragging?`opacity-50`:`opacity-100`} 
          `}
        ref={todoItemRef}>
          <div className='flex flex-col w-60 justify-center'>
              {isEditing?<input 
                className={props.h3TextStyling+' bg-gray-500 w-60'} 
                type='text' 
                autoFocus 
                value={tempTitle} 
                onChange={(e) => setTempTitle(e.currentTarget.value)} 
                onKeyUp={(e) => {
                  if (e.code === "Enter") {
                    updateTitle(tempTitle, tempDescription, props.index);
                  }
              }}></input>:<h3 className={props.h3TextStyling}>{props.todoItemDict.title}</h3>}
              {isEditing?<textarea 
                className={'text-gray-700 dark:text-gray-300 font-normal text-sm bg-gray-500 w-60 min-h-24'} 
                autoFocus
                value={tempDescription}
                onChange={(e) => setTempDescription(e.currentTarget.value)}
                onKeyUp={(e) => {
                  if (e.code === "Enter") {
                    updateTitle(tempTitle, tempDescription, props.index);
                  }}}
              />
              :<h4 className={props.h4TextStyling}>{props.todoItemDict.description}</h4>}
          </div>
          
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col items-end gap-2'>
              <h6 className={`${props.todoItemDict.priority === "Low"?
                `bg-green-600`:
                props.todoItemDict.priority === "Medium"?
                `bg-yellow-600`:
                `bg-red-600`} text-white rounded-full px-1 text-sm`}>{props.todoItemDict.priority}</h6>
              <div className='flex flex-row'>
                <EditButton onClick={setIsEditing}/>
                <DeleteButton item={props.todoItemDict.id} onClick={props.deleteTodoItem}/>
              </div>
            </div>
          </div>
          {(closestEdge && !dragging) && <DropIndicator edge={closestEdge} gap='12px'/>}
      </div>
    </>
  )
}

export default TodoItem