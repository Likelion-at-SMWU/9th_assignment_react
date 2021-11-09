import React from 'react';

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
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default CreateTodo;