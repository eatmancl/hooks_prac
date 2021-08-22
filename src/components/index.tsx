import React, { FC, ReactElement, useCallback, useEffect, useReducer } from 'react'
import TdInput from './Input'
import { ITodo, IState, ACTION_TYPE } from './type'
import { todoReducer } from './reducer'
import TdList from './List'

// const initialState: IState = {
//     todoList: []
// }

function init(initTodoList: ITodo[]): IState {
    return {
        todoList: initTodoList
    }
}

const TodoList: FC = (): ReactElement => {

    // const [todoList, setTodoList] = useState<ITodo[]>([])

    //useReducer
    const [state, dispatch] = useReducer(todoReducer, [], init)


    useEffect(() => {
        // console.log(todoList);
        const todoList = JSON.parse(localStorage.getItem('todolist') || '[]')

        dispatch({
            type: ACTION_TYPE.INIT_TODOLIST,
            payload: todoList
        })
    }, [])

    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(state.todoList))
    }, [state.todoList])

    const addTodo = useCallback((todo: ITodo) => {
        // setTodoList(todoList => [...todoList, todo])
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    }, [])

    const removeTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    }, [])

    const toggleTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    }, [])

    return (
        <div className="todo-list">
            <TdInput
                addTodo={addTodo}
                todoList={state.todoList}
            />
            <TdList
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                todoList={state.todoList}
            />
        </div>
    )
}

export default TodoList