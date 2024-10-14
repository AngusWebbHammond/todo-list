import { useEffect, useState } from 'react'
import './App.css'
import TodoBoard from './components/Todo-Board';

const defaultData : {id:string, title: string, type: string, description: string}[] = [
  {
    id: "todo1",
    title: "Create Todo List",
    type: "Todo",
    description: "",
  },
  {
    id: "todo2",
    title: "Learn Pragmatic Drag and Drop",
    type: "Todo",
    description: "",
  },
  {
    id: "todo3",
    title: "Create Calculator App",
    type: "Completed",
    description: "",
  },
  {
    id: "todo4",
    title: "Learn Tailwind CSS",
    type: "Todo",
    description: "",
  },
  {
    id: "todo5",
    title: "Add a Completed List",
    type: "Completed",
    description: "",
  },
  {
    id: "todo6",
    title: "Style the Todo List",
    type: "Completed",
    description: "",
  },
  {
    id: "todo7",
    title: "Add a Todo Counter",
    type: "Completed",
    description: "",
  },
  {
    id: "todo8",
    title: "Add Sorting",
    type: "Todo",
    description: "",
  }
];

const todoTypes: string[] = ["Todo", "Completed"];


function App() {
  const testData = false;
  const [data, setData] = useState<{id: string, title: string, type: string}[]>(testData?defaultData:JSON.parse(localStorage.getItem('data') || '{}'));
  const [todoId, setTodoId] = useState<number>(testData?defaultData.length:JSON.parse(localStorage.getItem('todoId') || '{}'));
  const [todoLists, setTodoLists] = useState<string[]>(testData?todoTypes:JSON.parse(localStorage.getItem('todoLists') || '{}'));
  const [todoListId, setTodoListId] = useState<number>(testData?todoTypes.length:JSON.parse(localStorage.getItem('todoListId') || '{}'));
  const [isTitleUpdating, setIsTitleUpdating] = useState<boolean>(false);
  
  useEffect(() => {

    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
    localStorage.setItem('todoListId', JSON.stringify(todoListId));
    localStorage.setItem('todoId', JSON.stringify(todoId));
    return;

  }, [data, todoLists, todoId, todoListId, isTitleUpdating]);

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
      <TodoBoard setTodoLists={setTodoLists} h1TextStyling={h1TextStyling} h3TextStyling={h3TextStyling} h4TextStyling={h4TextStyling} todoLists={todoLists} data={data} setData={setData} addNewTodo={addNewTodo} deleteTodoItem={deleteTodoItem} addNewTodoList={addNewTodoList} deleteTodoItemList={deleteTodoItemList} isTitleUpdating={isTitleUpdating} setIsTitleUpdating={setIsTitleUpdating}/>
    </div>
    
  )
}

export default App
