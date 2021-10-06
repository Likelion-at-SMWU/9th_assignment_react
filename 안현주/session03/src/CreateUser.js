import React from 'react';

function CreateUser({ date, todo, onChange, onCreate}) {
    return (
        <div>
            <input
                name="date"
                placeholder="날짜"
                onChange={onChange}
                value={date}
            />
            <input
                name="todo"
                placeholder="할 일"
                onChange={onChange}
                value={todo}
            />
            <button onClick={onCreate}>등록 </button>
        </div>
    );
}

export default CreateUser;