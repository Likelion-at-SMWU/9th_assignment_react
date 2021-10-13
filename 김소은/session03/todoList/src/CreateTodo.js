import React from 'react';
import Button from './Button';

function CreateTodo({ item, date, onChange, onCreate}) {
    return (
        <div id="createTodo">
            <input
                name="item"
                placeholder="할 일"
                onChange={onChange}
                value={item}
            />
            <input
                name="date"
                type="date"
                placeholder="마감일"
                onChange={onChange}
                value={date}
            />
            <Button onClick={onCreate}>등록</Button>
        </div>
    );
}

export default React.memo(CreateTodo);  //과제1. 코드 최적화하기(React.memo)
