import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components'
import Button from './Button';
import { size } from 'polished';


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
            <ThemeProvider
                theme={{
                    palette: {
                    blue: '#228be6',
                    gray: '#495057',
                    pink: '#f06569'
                    },
            }}>
                <Button color="pink" onClick={onCreate}>등록</Button>
            </ThemeProvider>
        </div>
    );
};

export default React.memo(CreateUser);