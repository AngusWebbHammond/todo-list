import { TodoType } from "../../types";
import AddNewTodoList from "./Add-New-Todo-List"
import TodoList from "./Todo-List"

type Props = {
    h1TextStyling: string,
    h3TextStyling: string,
    h4TextStyling: string,
    todoLists: string[],
    data: TodoType[],
    setData: (data: TodoType[]) => void,
    addNewTodo: (title: string) => void,
    deleteTodoItem: (id: string) => void,
    addNewTodoList: () => void,
    deleteTodoItemList: (title: string) => void,
    setTodoLists: (todoLists: string[]) => void,
    isTitleUpdating: boolean,
    setIsTitleUpdating: (isTitleUpdating: boolean) => void,
}

const TodoBoard = (props: Props) => {
  return (
    <div className='flex flex-row w-4/5 overflow-auto p-3 gap-3'>
        {props.todoLists.map((todoTitle: string, index: number) => 
            <TodoList 
              index={index} 
              isTitleUpdating={props.isTitleUpdating} 
              setIsTitleUpdating={props.setIsTitleUpdating} 
              setTodoLists={props.setTodoLists} 
              todoLists={props.todoLists} 
              todoTitle={todoTitle} 
              h1TextStyling={props.h1TextStyling} 
              h3TextStyling={props.h3TextStyling} 
              h4TextStyling={props.h4TextStyling} 
              data={props.data} 
              setData={props.setData} 
              addNewTodo={props.addNewTodo} 
              deleteTodoItem={props.deleteTodoItem} 
              deleteTodoItemList={props.deleteTodoItemList} 
              key={todoTitle}/>
        )}
        <AddNewTodoList 
          h3TextStyling={props.h3TextStyling} 
          addNewTodoList={props.addNewTodoList} 
          todoLists={props.todoLists}/>
    </div>
  )
}

export default TodoBoard