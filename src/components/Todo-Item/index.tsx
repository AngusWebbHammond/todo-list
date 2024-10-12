import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';

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
}

const TodoItem = (props: Props) => {
  // Drag and Drop Hooks
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<boolean>(false)
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const id = props.id;
  const title = props.title;
  const type = props.type;
  const index :number = props.index;

  useEffect(() => {
  const el = ref.current;
  invariant(el);
    
  return combine(
    draggable({
      element: el,
      getInitialData: () => ({ id, title, type}),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    }), 
    dropTargetForElements({
      element: el,
      onDragStart: () => setClosestEdge('top'),
      onDragEnter: () => {
        setIsDraggedOver(true);
        setClosestEdge('top');
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
        setClosestEdge(null);
      },
      onDrop: () => {
        setIsDraggedOver(false);
        setClosestEdge(null);
      },
      getData: () => ({ id, type, index }),
    }),
  )
  }, [id, title, type, index]);

  return (
    <>
      <div 
        className={`
            ${isDraggedOver?``:`bg-gray-300 dark:bg-slate-600`} relative rounded-md px-2 gap-2 flex justify-between items-center pl-3 pr-4 min-h-[5rem] ring-2 ring-slate-600 
          ${dragging?`opacity-50`:`opacity-100`} 
          `}
        ref={ref}>
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