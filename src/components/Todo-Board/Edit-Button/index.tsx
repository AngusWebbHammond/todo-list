import { Pencil } from "lucide-react"

type Props = {
    onClick: (bool: boolean) => void,
}

const EditButton = (props: Props) => {
  return (
    <button 
        className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' 
        onClick={() => props.onClick(true)}>
            <Pencil className="stroke-gray-300"/>
    </button>
  )
}

export default EditButton