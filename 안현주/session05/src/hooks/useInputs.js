import { useState, useCallback } from 'react';

function useInputs(initialForm) {
    const [form, setForm] = useState(initialForm);

    //change
    const onChange = useCallback(e => {
        const { todo, value} = e.target;
        setForm(form => ({ ...form, [todo] : value}));
    }, []);
    

    const reset = useCallback(() => setForm(initialForm), [initialForm]);
    return [form, onChange, reset];
}
 
export default useInputs;

