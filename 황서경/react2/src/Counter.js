import React, {useState} from 'react';

function Counter() {
    const [number, setNumber] = useState(1);

    const onMultiply = () => {
        setNumber(number * 2);
    }
    const onDivide = () => {
        setNumber(number / 2);
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onMultiply}>*2</button>
            <button onClick={onDivide}>/2</button>
        </div>
    );
}

export default Counter;