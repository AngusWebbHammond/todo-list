import { useEffect, useRef, useState } from "react";
import AddNewTodo from "../Add-New-Todo"
import TodoItem from "../Todo-Item"
import TodoListTitle from "../Todo-List-Title"
import { attachClosestEdge, Edge, extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import invariant from "tiny-invariant";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { draggable, dropTargetForElements, monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import DropIndicator from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { DropTargetRecord } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { flushSync } from "react-dom";
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { TodoType } from "../../../types";

type Props = {
    todoTitle: string,
    data: TodoType[],
    h1TextStyling: string,
    h3TextStyling: string,
    h4TextStyling: string,
    todoLists: string[],
    setData: (data: TodoType[]) => void,
    addNewTodo: (title: string) => void,
    deleteTodoItem: (id: string) => void,
    deleteTodoItemList: (title: string) => void,
    setTodoLists: (todoLists: string[]) => void,
    isTitleUpdating: boolean,
    setIsTitleUpdating: (isTitleUpdating: boolean) => void,
    index: number,
}

const TodoList = (props: Props) => {

    const todoListRef = useRef<HTMLDivElement | null>(null);
    const emptyRef = useRef<HTMLDivElement | null>(null); // to be used for an empty todo item for the empty todo lists
    const [dragging, setDragging] = useState<boolean>(false);
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

    const todoTitle: string = props.todoTitle;

    useEffect(() => {
        const el: HTMLDivElement | null = todoListRef.current;
        invariant(el);

        return combine(
            draggable({
                element: el,
                getInitialData: () => ({ todoTitle, dragType: "todo-list" }),
                onDragStart:() => setDragging(true),
                onDrop: () => setDragging(false),
            }),
            dropTargetForElements({
                element: el,
                onDragStart: (args) => {
                    if (args.source.data.dragType !== "todo-list") {
                        return;
                    }
                    setClosestEdge(extractClosestEdge(args.self.data));
                },
                onDragEnter: (args) => {
                    if (args.source.data.dragType !== "todo-list") {
                        return;
                    }
                    setClosestEdge(extractClosestEdge(args.self.data));
                },
                onDrag: (args) => {
                    if (closestEdge) {
                      return;
                    }

                    if (args.source.data.dragType !== "todo-list") {
                        return;
                    }

                    setClosestEdge(extractClosestEdge(args.self.data));
                  },
                onDragLeave: () => setClosestEdge(null),
                onDrop: () => setClosestEdge(null),
                getData: ({input, element}) => {
                    const data: {todoTitle: string} = { 
                      todoTitle 
                    };
          
                    return attachClosestEdge(data, {
                      input,
                      element,
                      allowedEdges: ['left', 'right']
                    })
                  },
            }),
            monitorForElements({
                onDrop: ({location, source}) => {
                    const target: DropTargetRecord = location.current.dropTargets[0];
                    if (!target) {
                        return;
                    }

                    const sourceData: Record<string, unknown> = source.data;
                    const targetData: Record<string, unknown> = target.data;

                    if (!sourceData || !targetData) {
                        return;
                    }

                    if (!targetData.todoTitle || !sourceData.todoTitle) {
                        return;
                    }

                    const indexOfSource: number = props.todoLists.findIndex((item: string) => item === sourceData.todoTitle);
                    const indexOfTarget: number = props.todoLists.findIndex((item: string) => item === targetData.todoTitle);

                    if (indexOfTarget < 0 || indexOfSource < 0) {
                        return;
                    }

                    const closestEdgeOfTarget: Edge | null = extractClosestEdge(targetData);

                    flushSync(() => {
                        props.setTodoLists(
                          reorderWithEdge({
                            list: props.todoLists,
                            startIndex: indexOfSource,
                            indexOfTarget,
                            closestEdgeOfTarget,
                            axis: 'horizontal',
                          }),
                        );
                      });
                }
            })
        )
    }, [todoTitle, props.todoLists])

    return (
        <div 
        className={`bg-gray-100 dark:bg-slate-700 rounded-lg min-w-96 max-w-96 ring-offset-slate-900/5 shadow-xl p-3 h-[54rem] flex flex-col justify-between ring-slate-800 ring-1 relative 
            ${dragging?`opacity-50`:`opacity-100`} `}
        ref={todoListRef}>
            {/* Todo List Header */}
            <div>
                <TodoListTitle 
                    setData={props.setData} 
                    setIsTitleUpdating={props.setIsTitleUpdating} 
                    isTitleUpdating={props.isTitleUpdating} 
                    todoLists={props.todoLists} 
                    setTodoLists={props.setTodoLists} 
                    index={props.index} 
                    todoTitle={props.todoTitle} 
                    h1TextStyling={props.h1TextStyling} 
                    data={props.data} 
                    deleteTodoItemList={props.deleteTodoItemList}/>
                {/* Todo List Contents */}
                <div className='bg-gray-200 dark:bg-slate-700 min-h-20 h-[43rem] flex flex-col overflow-auto p-3 gap-3'>
                    {props.data.filter((item) => item.type === props.todoTitle).map((todoItemDict: TodoType) => (
                        <TodoItem 
                            isTitleUpdating={props.isTitleUpdating} 
                            setIsTitleUpdating={props.setIsTitleUpdating} 
                            index={props.data.findIndex((item) => item.id === todoItemDict.id)} 
                            todoItemDict={todoItemDict} 
                            h3TextStyling={props.h3TextStyling} 
                            h4TextStyling={props.h4TextStyling} 
                            deleteTodoItem={props.deleteTodoItem} 
                            key={todoItemDict.id} 
                            data={props.data} 
                            setData={props.setData}/>
                    ))}
                    {props.data.filter((item) => item.type === props.todoTitle).length === 0 && <div ref={emptyRef}></div>}
                </div>
            </div>
            <div className="p-3">
                <AddNewTodo todoTitle={props.todoTitle} h3TextStyling={props.h3TextStyling} addNewTodo={props.addNewTodo}/>
            </div>
            {(closestEdge && !dragging) && <DropIndicator edge={closestEdge} gap="12px" />}
        </div>
    )
}

export default TodoList