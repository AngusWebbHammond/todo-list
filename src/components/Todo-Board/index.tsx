import AddNewTodoList from "../Add-New-Todo-List"
import TodoList from "../Todo-List"

type Props = {
    h1TextStyling: string,
    h3TextStyling:string,
    h4TextStyling:string,
    todoLists: string[],
    data: {
        id: string;
        title: string;
        type: string;
    }[],
    addNewTodo: (title: string) => void,
    deleteTodoItem: (id: string) => void,
    addNewTodoList: () => void,
    deleteTodoItemList: (title: string) => void,
}

const TodoBoard = (props: Props) => {
  return (
    <div className='flex flex-row gap-3 w-4/5 overflow-auto'>
        {props.todoLists.map((todoTitle: string) => 
            <TodoList todoTitle={todoTitle} h1TextStyling={props.h1TextStyling} h3TextStyling={props.h3TextStyling} h4TextStyling={props.h4TextStyling} data={props.data} addNewTodo={props.addNewTodo} deleteTodoItem={props.deleteTodoItem} deleteTodoItemList={props.deleteTodoItemList}/>
        )}
        <AddNewTodoList h3TextStyling={props.h3TextStyling} addNewTodoList={props.addNewTodoList}/>
    </div>
  )
}

export default TodoBoard