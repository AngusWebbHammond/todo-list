import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react";
import { TodoType } from "../../../types";

type Props = {
    todoTitle: string,
    data: TodoType[],
    h1TextStyling: string,
    deleteTodoItemList: (title: string) => void,
    todoLists: string[],
    setTodoLists: (todoLists: string[]) => void,
    index: number,
    isTitleUpdating: boolean,
    setIsTitleUpdating: (isTitleUpdating: boolean) => void,
    setData: (data: TodoType[]) => void,
}

const TodoListTitle = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(props.todoTitle);

  const updateTitle = (newTitle: string, index: number, oldTitle: string): void => {
    const tempTodoArr = props.todoLists;
    tempTodoArr[index] = newTitle;

    const tempTodoItemArr = props.data;

    for (let i = 0; i < tempTodoItemArr.length; i++) {
      if (tempTodoItemArr[i].type === oldTitle) {
        tempTodoItemArr[i].type = newTitle;
      }
    }
    props.setIsTitleUpdating(!props.isTitleUpdating);
    setIsEditing(false);
  }

  return (
    <div className='flex justify-between items-center px-3 py-3'>
        <div className='flex flex-row gap-3 items-center'>
            {isEditing?
            <input 
              className={props.h1TextStyling+' bg-gray-500'} 
              type='text' 
              autoFocus 
              value={tempTitle} 
              onChange={(e) => setTempTitle(e.currentTarget.value)} 
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  const newValue = e.currentTarget.value;
                  updateTitle(newValue, props.index, props.todoTitle);
                }
            }}></input>
            :<h1 className={props.h1TextStyling}>{props.todoTitle}</h1>}
            <span className='text-black dark:text-white bg-gray-200 dark:bg-slate-600 w-6 h-6 rounded-full flex justify-center items-center'>{props.data.filter((item) => item.type === props.todoTitle).length}</span>
        </div>

        <div className="flex flex-row gap-2">
          <button 
            className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' 
            onClick={() => setIsEditing(true)}><Pencil/></button>
          <button 
            className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' 
            onClick={() => props.deleteTodoItemList(props.todoTitle)}><Trash2 className='hover:stroke-rose-600'/></button>
        </div>
    </div>
  )
}

export default TodoListTitle