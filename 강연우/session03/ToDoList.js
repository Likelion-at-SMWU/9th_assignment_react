import React from 'react';

function ToDo({ todo,  onRemove, onToggle }) {
    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: todo.active ? 'purple' : 'black'
                }}
                onClick={() => onToggle(todo.id)}
            >
                {todo.listname}
            </b>
            <span>({todo.date})</span>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
        </div>
    );
}

function ToDoList({ dolists, onRemove, onToggle }) {
    return (
        <div>
            {dolists.map(todo => (
                <ToDo todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
                ))}
        </div>
    );
}

export default ToDoList;
