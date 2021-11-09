import React from "react";
import styled, { css } from 'styled-components';

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

function CreateTodo({calendar, dothing, onChange, onCreate}) {
    return (
        <div>
            <input
            name="calendar"
            placeholder="날짜"
            onChange={onChange}
            value={calendar}
            />
            <input
            name="dothing"
            placeholder="할 일"
            onChange={onChange}
            value={dothing}
            />
            <Button onClick={onCreate}>등록</Button>
        </div>
    );
}
export default React.memo(CreateTodo);
