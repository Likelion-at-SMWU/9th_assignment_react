import React, { useContext } from 'react';
import { UserDispatch } from './App';

const ToDo = React.memo(function ToDo({ todo }) {
    const dispatch = useContext(UserDispatch);
    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: todo.active ? 'purple' : 'black'
                }}
                onClick={() => {
                    dispatch({ type: 'TOGGLE_LIST', id: todo.id});
                }}
            >
                {todo.listname}
            </b>
            <span>({todo.date})</span>
            <button onClick={() => {
                dispatch({ type: 'REMOVE_LIST', id: todo.id });
            }}>삭제</button>
        </div>
    );
});

function ToDoList({ dolists }) {
    return (
        <div>
            {dolists.map(todo => (
                <ToDo todo={todo} key={todo.id} />
                ))}
        </div>
    );
}

export default React.memo(ToDoList);