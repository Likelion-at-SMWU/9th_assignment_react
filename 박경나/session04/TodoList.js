import React, {useContext} from "react";
import { UserDispatch } from "./App";

const Todo = React.memo(function Todo({todo}) {
    const dispatch = useContext(UserDispatch);
    return (
        <div>
            <b
            style={{
                cursor: 'pointer',
                color: todo.active ? 'green' : 'black'
            }}

            onClick={() => {
                dispatch({ type: 'TOGGLE_todo', id: todo.id});
            }}
            >
                {todo.calendar}
            </b>
            &nbsp;
            <span>({todo.dothing})</span>
            <button onClick={() => {
                dispatch({type: 'REMOVE_todo', id: todo.id});
                }}
            >
                삭제</button>
        </div>
    );
});

function TodoList({ todos }) {
    return (
        <div>
            {todos.map(todo => (
                <Todo todo={todo} key={todo.id}/>
            ))}
        </div>
    );
}

export default React.memo(TodoList); 
 14  session_04/src/hooks/useInputs.js 
