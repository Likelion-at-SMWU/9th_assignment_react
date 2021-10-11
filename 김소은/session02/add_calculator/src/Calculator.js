import React, { useState, useRef } from 'react';

function Calculator() {
    const [inputs, setInputs] = useState({
        num1: '',
        num2: '',
        result: 0
    });

    const num1Input = useRef();

    const { num1, num2, result } = inputs;

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
            result: ''
        });
    };

    const onResult = () => {
        setInputs({
            ...inputs,
            result: num1 != '' && num2 != '' ? Number(num1) + Number(num2) : "1개 이상의 값이 입력되지 않았습니다."
        });
    }

    const onReset = () => {
        setInputs({
            num1: '',
            num2: '',
            result: 0
        });
        num1Input.current.focus();
    }

    return(
        <div>
            <b>{num1}+{num2}={result}</b>
            <hr/>
            <input 
                name="num1" 
                placeholder="숫자를 입력하시오." 
                onChange={onChange} 
                value={num1} 
                ref={num1Input}
            />
            <b>+</b>
            <input 
                name="num2" 
                placeholder="숫자를 입력하시오." 
                onChange={onChange} 
                value={num2} 
            />
            <button onClick={onResult}>result</button>
            <button onClick={onReset}>reset</button>
        </div>
    )

}

export default Calculator;
