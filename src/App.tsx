import { useEffect, useRef, useState } from 'react'
import './App.css'
import TodoBoard from './components/Todo-Board';

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
  const [todoCount, setTodoCount] = useState<number>(defaultData.length);
  const [data, setData] = useState<{id: string, title: string, type: string,}[]>(defaultData);
  const [todoId, setTodoId] = useState<number>(defaultData.length);
  const [todoLists, setTodoLists] = useState<string[]>(todoTypes);
  const [todoListId, setTodoListId] = useState<number>(todoTypes.length);

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
      <TodoBoard h1TextStyling={h1TextStyling} h3TextStyling={h3TextStyling} h4TextStyling={h4TextStyling} todoLists={todoLists} data={data} addNewTodo={addNewTodo} deleteTodoItem={deleteTodoItem} addNewTodoList={addNewTodoList} deleteTodoItemList={deleteTodoItemList}/>
    </div>
    
  )
}

export default App
