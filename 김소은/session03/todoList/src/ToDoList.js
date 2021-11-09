import React, { useContext } from 'react';
import './TodoList.css';
import { UserDispatch } from './App';

const Todo = React.memo(function Todo({ idx, todo }) {  //과제1. 코드 최적화하기(React.memo)
    const dispatch = useContext(UserDispatch);  //과제3. Context Api 또는 immer 사용(Context Api)

    return (
        <div 
            className="todo"
            style={{
                marginLeft: idx <= 4 ? (100 + idx * 20 ) : (180 + (idx- 4) * 10) + 'px'
            }}
        >
            <b 
                className="item"
                onClick={() => {
                    dispatch({ type:'TOGGLE_TODO', id: todo.id });
                }}
                style={{
                    textDecoration: todo.complete ? 'line-through' : 'none'
                }}
            >
                { todo.item }
            </b>
            <span className="date">
                { todo.date }
            </span>
            <b className="btnDelete" onClick={() => {
                dispatch({ type: 'DISPLAY_DIALOG'})
                //dispatch({ type: 'REMOVE_TODO', id: todo.id})
            }}>X</b>
        </div>
    );
});

function TodoList({ todos }) {
    return (
        <div id="todoList">
            <div className="title">
                나의 할 일
            </div>
            <hr className="titleHr"/>
            { todos.map((todo, i) => (
                <Todo 
                    idx={i} 
                    todo={todo} 
                    key={todo.id} 
                />
            ))}
        </div>
    );
}

export default React.memo(TodoList);    //과제1. 코드 최적화하기(React.memo)
