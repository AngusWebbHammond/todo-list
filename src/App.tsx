import { useEffect, useState } from 'react'
import './App.css'
import TodoBoard from './components/Todo-Board';

const defaultData : {id:string, title: string, type: string}[] = [
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

const todoTypes: string[] = ["Todo", "Completed"];


function App() {
  const [data, setData] = useState<{id: string, title: string, type: string,}[]>(defaultData);
  const [todoId, setTodoId] = useState<number>(defaultData.length);
  const [todoLists, setTodoLists] = useState<string[]>(todoTypes);
  const [todoListId, setTodoListId] = useState<number>(todoTypes.length);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('data') || '{}');
    const lists = JSON.parse(localStorage.getItem('todoLists') || '{}');
    if (items) {
      setData(items);
      setTodoId(items.length+1);
    }
    if (lists) {
      setTodoLists(lists);
      setTodoId(lists.length+1);
    }
  }, [])
  
  useEffect(() => {
    if (!data || data.length < 1) {
      return;
    }
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
    return;

  }, [data, todoLists]);

  const h1TextStyling: string = 'text-black dark:text-white font-medium text-2xl flex justify-left';
  const h3TextStyling: string = 'text-gray-800 dark:text-gray-100 font-bold text-md flex justify-left items-center';
  const h4TextStyling: string = 'text-gray-700 dark:text-gray-300 font-normal text-sm flex justify-left';

  function deleteTodoItem (id: string): void {
    const alteredData: {id:string, title: string, type: string}[] = data.filter((item) => item.id !== id);
    setData(alteredData);
  }

  function addNewTodo (type: string): void {
    const newTodoId = 'todo' + (todoId + 1).toString();
    setTodoId(todoId + 1);
    const tempTodoList: {id:string, title: string, type: string}[] = data;
    tempTodoList.push({
      id: newTodoId,
      title: newTodoId,
      type: type,
    });
    setData(tempTodoList);
  }

  function addNewTodoList (): void {
    const tempTodoLists: string[] = todoLists;
    tempTodoLists.push("Todo List " + todoListId.toString());
    setTodoListId(todoListId + 1);
    setTodoLists(tempTodoLists);
  }

  function deleteTodoItemList (id: string): void {
    const filteredTodoItems: {id:string, title: string, type: string}[] = data.filter(item => item.type !== id);
    const tempTodoLists: string[] = todoLists.filter(item => item !== id);

    setData(filteredTodoItems);
    setTodoLists(tempTodoLists);
  }

  
  return (
    <div className='flex flex-row gap-2 justify-center items-center h-screen bg-white dark:bg-slate-900'>
      <TodoBoard setTodoLists={setTodoLists} h1TextStyling={h1TextStyling} h3TextStyling={h3TextStyling} h4TextStyling={h4TextStyling} todoLists={todoLists} data={data} setData={setData} addNewTodo={addNewTodo} deleteTodoItem={deleteTodoItem} addNewTodoList={addNewTodoList} deleteTodoItemList={deleteTodoItemList}/>
    </div>
    
  )
}

export default App
