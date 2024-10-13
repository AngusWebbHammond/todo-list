import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Trash2 } from "lucide-react"
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


type Props = {
    id: string,
    title: string,
    type: string,
    h3TextStyling: string,
    h4TextStyling: string,
    deleteTodoItem: (id: string) => void,
    index: number,
    setData: (data: {
      id: string;
      title: string;
      type: string;
    }[]) => void,
    data: {
      id: string;
      title: string;
      type: string;
    }[],
}

const TodoItem = (props: Props) => {
  // Drag and Drop Hooks
  const todoItemRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const id: string = props.id;
  const title: string = props.title;
  const type: string = props.type;
  const index: number = props.index;

  useEffect(() => {
    const element: HTMLDivElement | null = todoItemRef.current;
    invariant(element);
      
    return combine(
      draggable({
        element: element,
        getInitialData: () => ({ id, title, type}),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      }), 
      dropTargetForElements({
        element: element,
        onDragStart: (args) => setClosestEdge(extractClosestEdge(args.self.data)),
        onDragEnter: (args) => setClosestEdge(extractClosestEdge(args.self.data)),
        onDrag: (args) => {
          if (closestEdge) {
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

          const tempArr: {
            id: string;
            title: string;
            type: string;
          }[] = props.data;
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
  }, [id, title, type, index]);

  return (
    <>
      <div 
        className={`bg-gray-300 dark:bg-slate-600 relative rounded-md gap-2 flex justify-between items-center pl-3 pr-4 min-h-[5rem] ring-2 ring-slate-700 
          ${dragging?`opacity-50`:`opacity-100`} 
          `}
        ref={todoItemRef}>
          <div>
              <h3 className={props.h3TextStyling}>{props.title}</h3>
              <h4 className={props.h4TextStyling}>{props.type}</h4>
          </div>
          <button className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' onClick={() => props.deleteTodoItem(props.id)}><Trash2 className='hover:stroke-rose-600'/></button>
          {closestEdge && <DropIndicator edge={closestEdge} />}
      </div>
    </>
  )
}

export default TodoItem