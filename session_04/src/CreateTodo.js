import React from "react";

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
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default React.memo(CreateTodo);