import AddNewTodo from "../Add-New-Todo"
import TodoBreak from "../Todo-Break";
import TodoItem from "../Todo-Item"
import TodoListTitle from "../Todo-List-Title"

type Props = {
    todoTitle: string,
    data: {
        id: string;
        title: string;
        type: string;
    }[],
    h1TextStyling: string,
    h3TextStyling: string,
    h4TextStyling: string,
    addNewTodo: (title: string) => void,
    deleteTodoItem: (id: string) => void,
    deleteTodoItemList: (title: string) => void,
}

const TodoList = (props: Props) => {
  return (
    <div className={`bg-gray-100 dark:bg-slate-700 rounded-lg min-w-96 max-w-96 ring-1 ring-offset-slate-900/5 shadow-xl p-3 h-[54rem] flex flex-col justify-between ring-slate-700 m-1`}>
        {/* Todo List Header */}
        <div>
            <TodoListTitle todoTitle={props.todoTitle} h1TextStyling={props.h1TextStyling} data={props.data} deleteTodoItemList={props.deleteTodoItemList}/>
            {/* Todo List Contents */}
            <div className='bg-gray-200 dark:bg-slate-700 min-h-20 h-[44rem] flex flex-col gap-[0.5rem] overflow-auto'>
                <TodoBreak/>
                {props.data.filter((item) => item.type === props.todoTitle).map(({id, title, type}) => (
                    <TodoItem id={id} title={title} type={type} h3TextStyling={props.h3TextStyling} h4TextStyling={props.h4TextStyling} deleteTodoItem={props.deleteTodoItem} key={id}/>
                ))}
            </div>
        </div>
        <AddNewTodo todoTitle={props.todoTitle} h3TextStyling={props.h3TextStyling} addNewTodo={props.addNewTodo}/>
    </div>
  )
}

export default TodoList