import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Button from './Button';

function CreateToDo({ date, list, onChange, onCreate }) {
    return (
        <div>
            <input
                name="list"
                placeholder="할 일"
                onChange={onChange}
                value={list}
            />&nbsp;
            <input
                name="date"
                placeholder="기한"
                onChange={onChange}
                value={date}
            />&nbsp;
            <ThemeProvider
                theme={{
                    palette: {
                        pink: '#FFA98F',
                    }
                }}
            >
            <Button color="pink" size="medium" width="normal" onClick={onCreate}>등록</Button>
        </ThemeProvider>
        </div>
    );
}

export default React.memo(CreateToDo);
