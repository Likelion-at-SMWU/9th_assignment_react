import './App.css';
import React, { useRef, useState, useMemo } from 'react';
import ToDoList from './ToDoList';
import CreateToDo from './CreateToDo';

function countTodo(does) {
  console.log('완료한 항목 개수를 세는 중...');
  return does.filter(todo => todo.active).length;
}

function App() {
  const [does, setDoes] = useState([
    {
        id: 1,
        list: '밥 먹기',
        date: '2021-10-03',
        active: false
    },
    {
        id: 2,
        list: '강의 듣기',
        date: '2021-10-04',
        active: false
    },
    {
        id: 3,
        list: '산책하기',
        date: '2021-10-03',
        active: false
    },
    {
      id: 4,
      list: '쉬기',
      date: '2021-10-09',
      active: false
  }
  ]);

  const [inputs, setInputs] = useState({
    list: '',
    date: ''
  });

  const { list, date } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const nextId = useRef(5);
  const onCreate = () => {
    const todo = {
      id: nextId.current,
      list,
      date
    };
    setDoes(does.concat(todo));

    setInputs({
      list: '',
      date: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setDoes(does.filter(todo => todo.id !== id));
  };

  const onToggle = id => {
    setDoes(
      does.map(todo =>
        todo.id === id ? { ...todo, active: !todo.active } : todo
      )
    );
  };

  const count = useMemo(() => countTodo(does), [does]);

  return (
    <div class="whole">
      <h1>Seokyeong's ToDoList</h1>
      <CreateToDo
        list={list}
        date={date}
        onChange={onChange}
        onCreate={onCreate}
      />
      <br/>
      <ToDoList does={does} onRemove={onRemove} onToggle={onToggle}/>
      <br/>
      <div>완료한 항목 수: {count}</div>
    </div> 
  );  
}

export default App;
