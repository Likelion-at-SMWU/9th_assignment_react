import React, {useContext} from "react";
import styled, { css } from 'styled-components';
import { UserDispatch } from "./App";

const Button = styled.button`
  padding: 6px 12px;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #74b9ff;
  :hover {
    background-color: #99c6f5;
  }
`;

const RedBtn = styled(Button)`
    background-color: #f53e3e;
    :hover {
        background-color: #ff7268;
    } `;


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
            <RedBtn onClick={() => {
                dispatch({type: 'REMOVE_todo', id: todo.id});
                }}
            >
                삭제</RedBtn>
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