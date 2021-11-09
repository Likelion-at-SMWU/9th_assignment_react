import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Button from './Button'


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

            <>
                <ThemeProvider
                    theme={{
                     palette: {
                       blue: '#228be6',
                       gray: '#495057',
                        pink: '#f06595',
                        green: '#008000'
                     }
                    }}
                >
                    
                <Button size='x-small' color='gray' onClick={onCreate}>등록 </Button>
                </ThemeProvider>
            </>

        </div>
    ); 
}

export default React.memo(CreateUser);