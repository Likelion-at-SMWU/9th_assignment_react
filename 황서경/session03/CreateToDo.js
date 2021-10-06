import React from 'react';

function CreateToDo({ date, list, onChange, onCreate }) {
    return (
        <div>
            <input
                name="list"
                placeholder="할 일"
                onChange={onChange}
                value={list}
            />
            <input
                name="date"
                placeholder="기한"
                onChange={onChange}
                value={date}
            />&nbsp;
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default CreateToDo;
