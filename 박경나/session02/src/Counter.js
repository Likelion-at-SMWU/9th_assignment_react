import React, { useState } from 'react';

//Counter
function Counter() {
    const [number, setNumber ] = useState(0);

    const onIncrease = () => {
        setNumber(prevNumber => prevNumber+2);
    }
    const onDecrease = () => {
        setNumber(prevNumber => prevNumber-2);
    }

    return(
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+2</button>
            <button onClick={onDecrease}>-2</button>
        </div>
    );
}

export default Counter;