import { useState } from 'react'
import './App.css'
import { PlusCircle, Trash2 } from 'lucide-react';
import TodoItem from './components/Todo-Item';
import AddNewTodoList from './components/Add-New-Todo-List';

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
    type: "Completed",
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
];

const todoTypes = ["Todo", "Completed"];


function App() {
  const [todoCount, setTodoCount] = useState(defaultData.length);
  const [data, setData] = useState(defaultData);
  const [todoId, setTodoId] = useState(defaultData.length);
  const [todoLists, setTodoLists] = useState(todoTypes);
  const [todoListId, setTodoListId] = useState(todoTypes.length);

  const h1TextStyling = 'text-black dark:text-white font-medium text-2xl flex justify-left';
  const h3TextStyling = 'text-gray-800 dark:text-gray-100 font-bold text-md flex justify-left items-center';
  const h4TextStyling = 'text-gray-700 dark:text-gray-300 font-normal text-sm flex justify-left';

  function deleteTodoItem (id: string): void {
    const alteredData = data.filter((item) => item.id !== id);
    setData(alteredData);
    setTodoCount(alteredData.length);
  }

  function addNewTodo (type: string): void {
    const newTodoId = 'todo' + (todoId + 1).toString();
    setTodoId(todoId + 1);
    const tempTodoList = data;
    tempTodoList.push({
      id: newTodoId,
      title: newTodoId,
      type: type,
    });
    setData(tempTodoList);
    setTodoCount(tempTodoList.length)
  }

  function addNewTodoList (): void {
    const tempTodoLists = todoLists;
    tempTodoLists.push("Todo List " + todoListId.toString());
    setTodoListId(todoListId + 1);
    setTodoLists(tempTodoLists);
  }

  function deleteTodoItemList (id: string): void {
    const filteredTodoItems = data.filter(item => item.type !== id);
    const tempTodoLists = todoLists.filter(item => item !== id);

    setData(filteredTodoItems);
    setTodoLists(tempTodoLists);
  }

  return (
    <div className='flex flex-row gap-2 justify-center items-center h-screen bg-white dark:bg-slate-900'>
      <div className='flex flex-row gap-3 overflow-auto'>
        {todoLists.map((todoTitle: string) => 
          <div className={`bg-gray-100 dark:bg-slate-700 rounded-lg min-w-96 max-w-96 ring-1 ring-offset-slate-900/5 shadow-xl p-3 h-[54rem] flex flex-col justify-between ring-slate-700 m-1`} key={todoTitle}>
            {/* Todo List Header */}
            <div>
              <div className='flex justify-between items-center px-3 py-3'>
                
                <div className='flex flex-row gap-3 items-center'>
                  <h1 className={h1TextStyling}>{todoTitle}</h1>
                  <span className='text-black dark:text-white bg-gray-200 dark:bg-slate-600 w-6 h-6 rounded-full flex justify-center items-center'>{data.filter((item) => item.type === todoTitle).length}</span>
                </div>
                <button className='hover:bg-gray-500 dark:hover:bg-slate-500 rounded-full h-7 w-7 flex justify-center items-center' onClick={() => deleteTodoItemList(todoTitle)}><Trash2 className='hover:stroke-rose-600'/></button>
              </div>
              {/* Todo List Contents */}
              <div className='bg-gray-200 dark:bg-slate-700 min-h-20 h-[44rem] flex flex-col gap-[0.5rem] overflow-auto'>
                {data.filter((item) => item.type === todoTitle).map(({id, title, type}) => (
                  <TodoItem id={id} title={title} type={type} h3TextStyling={h3TextStyling} h4TextStyling={h4TextStyling} deleteTodoItem={deleteTodoItem} key={id}/>
                ))}
              </div>
            </div>
            <div className='bg-gray-200 dark:bg-slate-600 rounded-md px-2 gap-2 flex items-center pl-2 pr-4 h-[5rem] hover:ring-blue-600 ring-2 ring-slate-600' onClick={() => addNewTodo(todoTitle)}>
              <PlusCircle className='stroke-gray-100'/>
              <h3 className={h3TextStyling}>Add Todo</h3>
            </div>
          </div>
        )}
        <AddNewTodoList h3TextStyling={h3TextStyling} addNewTodoList={addNewTodoList}/>
      </div>
    </div>
    
  )
}

export default App
