import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import TodoBreak from '../Todo-Break';

type Props = {
    id: string,
    title: string,
    type: string,
    h3TextStyling: string,
    h4TextStyling: string,
    deleteTodoItem: (id: string) => void,
}

const TodoItem = (props: Props) => {
  // Drag and Drop Hooks
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false)
  const dropRef = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  useEffect(() => {
  const el = ref.current;
  invariant(el);
    
    return draggable({
    element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })
  })

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);

  return (
    <>
      <div 
        className={`
          bg-gray-300 dark:bg-slate-600 rounded-md px-2 gap-2 flex justify-between items-center pl-3 pr-4 min-h-[5rem] ring-2 ring-slate-600 
          ${dragging?`opacity-50`:`opacity-100`}
          `}
        ref={ref}>
          <div>
              <h3 className={props.h3TextStyling}>{props.title}</h3>
              <h4 className={props.h4TextStyling}>{props.type}</h4>
          </div>
          <button className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' onClick={() => props.deleteTodoItem(props.id)}><Trash2 className='hover:stroke-rose-600'/></button>
      </div>
      <TodoBreak/>
    </>
  )
}

export default TodoItem