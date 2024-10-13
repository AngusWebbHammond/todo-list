import { PlusCircle } from "lucide-react"

type Props = {
    h3TextStyling: string,
    addNewTodoList: () => void,
}

const AddNewTodoList = (props: Props) => {
  return (
    <div className='h-[54rem]'>
        <div className={`bg-gray-100 dark:bg-slate-700 rounded-lg min-w-96 max-w-96 ring-1 ring-offset-slate-900/5 shadow-xl p-3 h-[5rem] flex flex-row gap-3 items-center hover:ring-blue-600 ring-slate-700 hover:bg-slate-600`} onClick={props.addNewTodoList} key="NewTodoList">
        <PlusCircle className='stroke-gray-100'/>
        <h3 className={props.h3TextStyling}>Add Todo List</h3>
        </div>
    </div>
  )
}

export default AddNewTodoList