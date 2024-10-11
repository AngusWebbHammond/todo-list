import { Trash2 } from "lucide-react"

type Props = {
    todoTitle: string,
    data: {
        id: string;
        title: string;
        type: string;
    }[],
    h1TextStyling: string,
    deleteTodoItemList: (title: string) => void,
}

const TodoListTitle = (props: Props) => {
  return (
    <div className='flex justify-between items-center px-3 py-3'>
        <div className='flex flex-row gap-3 items-center'>
            <h1 className={props.h1TextStyling}>{props.todoTitle}</h1>
            <span className='text-black dark:text-white bg-gray-200 dark:bg-slate-600 w-6 h-6 rounded-full flex justify-center items-center'>{props.data.filter((item) => item.type === props.todoTitle).length}</span>
        </div>
        <button className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' onClick={() => props.deleteTodoItemList(props.todoTitle)}><Trash2 className='hover:stroke-rose-600'/></button>
    </div>
  )
}

export default TodoListTitle