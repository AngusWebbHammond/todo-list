import { useState } from 'react'
import './App.css'

const defaultData = [
  {
    id: "todo1",
    title: "Create Todo List",
    type: "Todo",
  },
  {
    id: "todo2",
    title: "Learn Pragmatic Drag and Drop",
    type: "Todo",
  },
  {
    id: "todo3",
    title: "Create Calculator App",
    type: "Completed",
  },
  {
    id: "todo4",
    title: "Learn Tailwind CSS",
    type: "Todo",
  }
]


function App() {
  const [todoCount, setTodoCount] = useState(defaultData.length);
  const [data, setData] = useState(defaultData);

  const h1TextStyling = 'text-black dark:text-white font-medium text-2xl flex justify-left'
  const h3TextStyling = 'text-gray-800 dark:text-gray-100 font-bold text-md flex justify-left'
  const h4TextStyling = 'text-gray-700 dark:text-gray-300 font-normal text-sm flex justify-left'

  return (
    <div className={`bg-gray-100 dark:bg-slate-700 rounded-lg  w-64 ring-1 ring-offset-slate-900/5 shadow-xl p-3`}>
      {/* Todo List Header */}
      <div className='flex justify-between items-center px-3 py-3'>
        <h1 className={h1TextStyling}>Todo List</h1>
        <span className='text-black dark:text-white bg-gray-200 dark:bg-slate-600 w-6 h-6 rounded-full flex justify-center items-center'>{todoCount}</span>
      </div>
      {/* Todo List Contents */}
      <div className='bg-gray-200 dark:bg-slate-700'>
        {data.map(({id, title, type}) => 
          <div key={id} className='bg-gray-200 dark:bg-slate-600 mb-0.5 rounded-md px-2'>
            <h3 className={h3TextStyling}>{title}</h3>
            <h4 className={h4TextStyling}>{type}</h4>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default App
