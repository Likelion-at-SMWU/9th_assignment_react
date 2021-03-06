import React, { useEffect } from 'react';
import './TodoList.css';

function Todo({ idx, todo, onRemove, onToggle }) {
    useEffect(() => {
        console.log(todo);
    });
    return (
        <div 
            class="todo"
            style={{
                marginLeft: idx <= 4 ? (100 + idx * 20 ) : (180 + (idx- 4) * 10) + 'px'
            }}
        >
            <b 
                class="item"
                onClick={() => onToggle(todo.id)}
                style={{
                    textDecoration: todo.complete ? 'line-through' : 'none'
                }}
            >
                { todo.item }
            </b>
            <span class="date">
                { todo.date }
            </span>
            <b class="btnDelete" onClick={() => onRemove(todo.id)}>X</b>
        </div>
    )
}

function TodoList({ todos, onRemove, onToggle }) {
    return (
        <div id="todoList">
            <div class="title">
                나의 할 일
            </div>
            <hr class="titleHr"/>
            { todos.map((todo, i) => (
                <Todo 
                    idx={i} 
                    todo={todo} 
                    key={todo.id} 
                    onRemove={onRemove} 
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default TodoList;