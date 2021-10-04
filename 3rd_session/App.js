import React, { useRef, useState, useMemo } from 'react';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';

function countActiveTodos(todos) {
  console.log('완료한 일 세는 중...');
  return todos.filter(todo => todo.active).length;
}

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      calendar: '2021-10-04',
      dothing: '운영체제원리'
    },
    {
      id: 2,
      calendar: '2021-10-01',
      dothing: '네트워크'
    },
    {
      id: 3,
      calendar: '2021-10-02',
      dothing: '멋쟁이사자처럼'
    }
  ]);

  const [inputs, setInputs] = useState({
    calendar: '',
    dothing: ''
  });

  const {calendar, dothing} = inputs;

  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const nextId = useRef(4);
  const onCreate = () => {
    const todo = {
      id: nextId.current,
      calendar,
      dothing
    };
    setTodos(todos.concat(todo));

    setInputs({
      calendar: '',
      dothing: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onToggle = id => {
    setTodos(
      todos.map(todo =>
          todo.id === id? { ...todo, active: !todo.acive } : todo
        )
    );
  }

  const count = useMemo(() => countActiveTodos(todos), [todos]);

  return (
    <>
      <CreateTodo
        calendar={ calendar }
        dothing = { dothing }
        onChange={onChange}
        onCreate={onCreate}
      />
      <TodoList todos = {todos} onRemove={onRemove} onToggle={onToggle}/>
      <div>완료한 항목 수 : {count}</div>
    </>
  );
}

export default App;
