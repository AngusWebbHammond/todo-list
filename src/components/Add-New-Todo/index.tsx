import { PlusCircle } from "lucide-react"

type Props = {
    todoTitle: string,
    h3TextStyling: string,
    addNewTodo: (title: string) => void,
}

const AddNewTodo = (props: Props) => {
  return (
    <div className='bg-gray-200 dark:bg-slate-600 rounded-md px-2 gap-2 flex items-center pl-2 pr-4 h-[5rem] hover:ring-blue-600 ring-2 ring-slate-600' onClick={() => props.addNewTodo(props.todoTitle)}>
        <PlusCircle className='stroke-gray-100'/>
        <h3 className={props.h3TextStyling}>Add Todo</h3>
    </div>
  )
}

export default AddNewTodo