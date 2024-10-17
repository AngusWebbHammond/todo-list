import { Trash2 } from "lucide-react"

type Props = {
    item: string,
    onClick: (item: string) => void,
}

const DeleteButton = (props: Props) => {
  return (
    <button 
        className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' 
        onClick={() => props.onClick(props.item)}>
            <Trash2 className='stroke-gray-300 hover:stroke-rose-600 '/>
    </button>
  )
}

export default DeleteButton