import React,{ useRef ,FC, ReactElement} from 'react'
import { ITodo } from '../type';

interface IPorps{
    addTodo:(todo: ITodo)=>void
    todoList:ITodo[]
};


const TdInput:FC<IPorps> = ({
    addTodo,
    todoList
}):ReactElement=>{
    const inputRef = useRef<HTMLInputElement>(null);

    const addItem = ():void =>{
        const val: string = inputRef.current!.value.trim();
        if(val.length){
            const isExist = todoList.find(todo=>todo.content === val)
            if(isExist){
                alert('exist')
                return
            }
            addTodo({
                id:new Date().getTime(),
                content: val,
                completed:false
            })

            inputRef.current!.value = ''
        }
    }


    return (
        <div className="todo-input">
            <input type="text" placeholder="input" ref={inputRef}/>
            <button onClick={addItem}>add</button>

        </div>
    )
}

export default TdInput