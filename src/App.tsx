import { useState } from 'react'
import './App.css'
import { Trash2 } from 'lucide-react';

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
  },
  {
    id: "todo5",
    title: "Add a Completed List",
    type: "Todo",
  },
  {
    id: "todo6",
    title: "Style the Todo List",
    type: "Completed",
  },
  {
    id: "todo7",
    title: "Add a Todo Counter",
    type: "Completed",
  },
  {
    id: "todo8",
    title: "Add Sorting",
    type: "Todo",
  }
]


function App() {
  const [todoCount, setTodoCount] = useState(defaultData.length);
  const [data, setData] = useState(defaultData);

  const h1TextStyling = 'text-black dark:text-white font-medium text-2xl flex justify-left'
  const h3TextStyling = 'text-gray-800 dark:text-gray-100 font-bold text-md flex justify-left'
  const h4TextStyling = 'text-gray-700 dark:text-gray-300 font-normal text-sm flex justify-left'

  function deleteTodoItem (id: String) {
    const alteredData = data.filter((item) => item.id !== id);
    setData(alteredData);
  }

  return (
    <div className={`bg-gray-100 dark:bg-slate-700 rounded-lg  w-96 ring-1 ring-offset-slate-900/5 shadow-xl p-3`}>
      {/* Todo List Header */}
      <div className='flex justify-between items-center px-3 py-3'>
        <h1 className={h1TextStyling}>Todo List</h1>
        <span className='text-black dark:text-white bg-gray-200 dark:bg-slate-600 w-6 h-6 rounded-full flex justify-center items-center'>{todoCount}</span>
      </div>
      {/* Todo List Contents */}
      <div className='bg-gray-200 dark:bg-slate-700 min-h-20 flex flex-col gap-1'>
        {data.map(({id, title, type}, index) => 
          <div key={id} className='bg-gray-200 dark:bg-slate-600 rounded-md px-2 gap-2 flex justify-between items-center pl-3 pr-4'>
            <div>
              <h3 className={h3TextStyling}>{title}</h3>
              <h4 className={h4TextStyling}>{type}</h4>
            </div>
            
            <button className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' onClick={() => deleteTodoItem(id)}><Trash2 className='hover:stroke-rose-600'/></button>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default App
