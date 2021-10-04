import React, { useRef } from "react";

function Todo({todo, onRemove, onToggle}) {
    return (
        <div>
            <b
            style={{
                cursor: 'pointer',
                color: todo.active ? 'green' : 'black'
            }}
            onClick={() => onToggle(todo.id)}
            >{todo.calendar}</b>
            <span>({todo.dothing})</span>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
        </div>
    );
}

function TodoList({ todos, onRemove, onToggle }) {
    return (
        <div>
            {todos.map(todo => (
                <Todo
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