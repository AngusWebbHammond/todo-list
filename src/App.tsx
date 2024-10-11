import { useState } from 'react'
import './App.css'
import { PlusCircle, Trash2 } from 'lucide-react';
import TodoItem from './components/Todo-Item';
import AddNewTodoList from './components/Add-New-Todo-List';
import AddNewTodo from './components/Add-New-Todo';
import TodoListTitle from './components/Todo-List-Title';

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
              <TodoListTitle todoTitle={todoTitle} h1TextStyling={h1TextStyling} data={data} deleteTodoItemList={deleteTodoItemList}/>
              {/* Todo List Contents */}
              <div className='bg-gray-200 dark:bg-slate-700 min-h-20 h-[44rem] flex flex-col gap-[0.5rem] overflow-auto'>
                {data.filter((item) => item.type === todoTitle).map(({id, title, type}) => (
                  <TodoItem id={id} title={title} type={type} h3TextStyling={h3TextStyling} h4TextStyling={h4TextStyling} deleteTodoItem={deleteTodoItem} key={id}/>
                ))}
              </div>
            </div>
            <AddNewTodo todoTitle={todoTitle} h3TextStyling={h3TextStyling} addNewTodo={addNewTodo}/>
          </div>
        )}
        <AddNewTodoList h3TextStyling={h3TextStyling} addNewTodoList={addNewTodoList}/>
      </div>
    </div>
    
  )
}

export default App
