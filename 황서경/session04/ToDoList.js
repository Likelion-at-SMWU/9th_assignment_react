import React, { useContext } from 'react';
import { TodoDispatch } from './App';

const ToDo = React.memo(function ToDo({ todo }) {
    const dispatch = useContext(TodoDispatch);    

    return (
        <div>
            <input type="checkbox" onClick={() => {
                dispatch({ type: 'TOGGLE_TODO', id: todo.id });
            }}/>&nbsp;
            <b
                style={{
                    cursor: 'pointer',
                    textDecoration: todo.active ? "line-through" : null,
                    color: todo.active ? '#FF7493' : 'black'
                }}
                >
                {todo.list}&nbsp;
                </b> 
                
            <span>{todo.date}&nbsp;</span>

            <img src="remove.png" onClick={() => {
                dispatch({ type: 'REMOVE_TODO', id: todo.id });
            }}/>
        </div>
    );
});

function ToDoList({ does }) {
    return (
        <div>
            {does.map(todo => (
                <ToDo 
                todo={todo} 
                key={todo.id} 
                />
            ))}
        </div>
    );
}

export default React.memo(ToDoList);
