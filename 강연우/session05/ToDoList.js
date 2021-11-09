import React, { useContext } from 'react';
import { UserDispatch } from './App';
import Button from './Button';
import { ThemeProvider } from 'styled-components';

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
            <ThemeProvider
            theme={{
                palette: {
                    blue: '#228be6',
                    gray: '#495057',
                    pink: '#f06595'
                }
            }}
            >
                <Button color="pink" onClick={() => {
                    dispatch({ type: 'REMOVE_LIST', id: todo.id });
                }}>삭제</Button>
            </ThemeProvider>
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
