import React from "react";

function CreateList({ listname, date, onChange, onCreate }) {
    return (
        <div>
            <input
                name="listname"
                placeholder="할 일"
                onChange={onChange}
                value={listname}
            />
            <input
                name="date"
                placeholder="날짜"
                onChange={onChange}
                value={date}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default CreateList;