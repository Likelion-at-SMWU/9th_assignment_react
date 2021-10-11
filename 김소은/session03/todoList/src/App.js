import React, { useRef, useState, useMemo } from'react';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';
import './App.css';

function countCompleteTodos(todos) {
  console.log('완료된 to do 수를 세는 중...');
  return todos.filter(todo => todo.complete).length;
}

function countNotDoneTodos(todos) {
  console.log('완료되지 않은 to do 수를 세는 중...');
  return todos.filter(todo => ! todo.complete).length;
}

function App() {
  const [inputs,setInputs] = useState({
    item: '',
    date: ''
  });

  const { item, date } = inputs;

  const onChange = e => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  };
  
  const [todos, setTodos] = useState([
    {
      id: 1,
      item: '멋사 과제하기',
      date: '2021-10-04',
      complete: true
    },
    {
      id: 2,
      item: '스우파 보기',
      date: '2021-10-05',
      complete: false
    },
    {
      id: 3,
      item: '방청소 하기',
      date: '2021-10-11',
      complete: false
    }
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const todo = {
      id : nextId.current,
      item,
      date
    }

    setTodos([...todos, todo]);

    setInputs({
      item: '',
      date: ''
    });

    nextId.current += 1;
  };

  const onRemove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onToggle = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
        )
    );
  };

  const countComplete = useMemo(() => countCompleteTodos(todos), [todos]);
  const countNotDone = useMemo(() => countNotDoneTodos(todos), [todos]);

  return (
    <div class="App">
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      <CreateTodo item={item} date={date} onChange={onChange} onCreate={onCreate} />
      <div class="count">해야 할 일: <span class="important">{countNotDone}</span> / 완료한 할 일: {countComplete}</div>
    </div>
  );
}

export default App;
