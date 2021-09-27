import React, { useState, useRef} from 'react';

function InputSample(){
    const result = ''

    const [inputs, setInputs] = useState({
        num1: '',
        num2: '',
        result:''
    });

    const numInput = useRef();
    const {num1, num2 } = inputs;
    

    const onChange = e => {
        const {value,num1} = e.target;
        setInputs({
            ...inputs,
            [num1]: value
        });
    };

    const onResult = () => {
        setInputs({
            num1: num1,
            num2: num2,
            result : num1 + num2
        });
        numInput.current.focus();
    };


    const onReset = () => {
        setInputs({
            num1: '',
            num2: '',
            result: '',
        });
        numInput.current.focus();
    };


    return (
        <div>
          <div>
            {num1} <b> + </b> {num2} <b> = </b> {result}
          </div>

          <input name="num1" placeholder="숫자를 입력하시오." onChange={onChange} value={num1} ref={numInput}/>
          <b>+</b>
          <input name="num2" placeholder="숫자를 입력하시오." onChange={onChange} value={num2} />

          <button onClick={onResult}>result</button>
          <button onClick={onReset}>reset</button>
        </div>
      );
}

export default InputSample;