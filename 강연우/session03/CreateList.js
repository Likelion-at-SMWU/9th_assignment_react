import React from "react";
import Button from "./Button";
import { ThemeProvider } from "styled-components";
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
            <ThemeProvider
            theme={{
                palette: {
                    blue: '#228be6',
                    gray: '#495057',
                    pink: '#f06595'
                }
            }}
            >
                <Button onClick={onCreate}>등록</Button>
            </ThemeProvider>
        </div>
    );
}

export default React.memo(CreateList);