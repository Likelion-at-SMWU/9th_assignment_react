import React from 'react';
import './App.css';

const CreateUser = ({ date, whattodo, onChange, onCreate }) => {
    return (
        <div id="input">
            <input
                name="date"
                placeholder="날짜"
                onChange={onChange}
                value={date}
            />
            <input
                name="whattodo"
                placeholder="할일"
                onChange={onChange}
                value={whattodo}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
};

export default React.memo(CreateUser);