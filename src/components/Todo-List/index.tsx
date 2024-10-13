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
    todoLists: string[],
    setData: (data: {
        id: string;
        title: string;
        type: string;
      }[]) => void,
    addNewTodo: (title: string) => void,
    deleteTodoItem: (id: string) => void,
    deleteTodoItemList: (title: string) => void,
    setTodoLists: (todoLists: string[]) => void,
}

const TodoList = (props: Props) => {

    const todoListRef = useRef<HTMLDivElement | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

    const todoTitle: string = props.todoTitle;

    useEffect(() => {
        const el: HTMLDivElement | null = todoListRef.current;
        invariant(el);

        return combine(
            draggable({
                element: el,
                getInitialData: () => ({ todoTitle }),
                onDragStart:() => setDragging(true),
                onDrop: () => setDragging(false),
            }),
            dropTargetForElements({
                element: el,
                onDragStart: (args) => setClosestEdge(extractClosestEdge(args.self.data)),
                onDragEnter: (args) => setClosestEdge(extractClosestEdge(args.self.data)),
                onDrag: (args) => {
                    if (closestEdge) {
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
    }, [todoTitle])

    return (
        <div 
        className={`bg-gray-100 dark:bg-slate-700 rounded-lg min-w-96 max-w-96 ring-offset-slate-900/5 shadow-xl p-3 h-[54rem] flex flex-col justify-between ring-slate-800 ring-1 relative 
            ${dragging?`opacity-50`:`opacity-100`} `}
        ref={todoListRef}>
            {/* Todo List Header */}
            <div>
                <TodoListTitle todoTitle={props.todoTitle} h1TextStyling={props.h1TextStyling} data={props.data} deleteTodoItemList={props.deleteTodoItemList}/>
                {/* Todo List Contents */}
                <div className='bg-gray-200 dark:bg-slate-700 min-h-20 h-[43rem] flex flex-col overflow-auto p-2 gap-3'>
                    {props.data.filter((item) => item.type === props.todoTitle).map(({id, title, type}) => (
                        <TodoItem index={props.data.findIndex((item) => item.id === id)} id={id} title={title} type={type} h3TextStyling={props.h3TextStyling} h4TextStyling={props.h4TextStyling} deleteTodoItem={props.deleteTodoItem} key={id} data={props.data} setData={props.setData}/>
                    ))}
                </div>
            </div>
            <div className="p-2">
                <AddNewTodo todoTitle={props.todoTitle} h3TextStyling={props.h3TextStyling} addNewTodo={props.addNewTodo}/>
            </div>
            {closestEdge && <DropIndicator edge={closestEdge} gap="12px" />}
        </div>
    )
}

export default TodoList