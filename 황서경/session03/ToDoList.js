import React from 'react';

function ToDo({ todo, onRemove, onToggle }) {
    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: todo.active ? '#FF7493' : 'black'
                }}
                >
                {todo.list}&nbsp;
                </b> 
                
            <span>{todo.date}&nbsp;</span>
            <input type="checkbox" onClick={() => onToggle(todo.id)}/>&nbsp;
            <img src="remove.png" onClick={() => onRemove(todo.id)}/>
        </div>
    );
}

function ToDoList({ does, onRemove, onToggle }) {
    return (
        <div>
            {does.map(todo => (
                <ToDo 
                todo={todo} 
                key={todo.id} 
                onRemove={onRemove}
                onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default ToDoList;
