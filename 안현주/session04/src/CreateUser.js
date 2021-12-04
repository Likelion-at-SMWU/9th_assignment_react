import React from 'react';

function CreateUser({ todo, date, onChange, onCreate}) {
    return (
        <div>
            <input
                name="todo"
                placeholder="할 일"
                onChange={onChange}
                value={todo}
            />
            <input
                name="date"
                placeholder="날짜"
                onChange={onChange}
                value={date}
            />
            <button onClick={onCreate}>등록 </button>
        </div>
    ); 
}

export default React.memo(CreateUser);