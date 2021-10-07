import ToDoList from './ToDoList';
import React, { useRef, useState, useMemo } from 'react';
import CreateList from './CreateList';
import './App.css';

function countActiveLists(dolists) {
  console.log('활성 리스트 수를 세는 중...');
  return dolists.filter(todo => todo.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    listname: '',
    date: ''
  });

  const { listname, date } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const nextId = useRef(4);

  const onCreate = () => {
    const todo = {
      id: nextId.current,
      listname,
      date
    };
    setLists(dolists.concat(todo));
    setInputs({
      listname: '',
      date: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setLists(dolists.filter(todo => todo.id !== id));
  };

  const onToggle = id => {
    setLists(
      dolists.map(todo =>
        todo.id === id ? { ...todo, active: !todo.active } : todo
      )
    );
  };

  const [dolists, setLists] = useState([
    {
        id: 1,
        listname: '멋사 세션 진행하기',
        date: '2021-09-28',
        active: true
    },
    {
        id: 2,
        listname: '모각코 참여하기',
        date: '2021-10-02',
        active: false
    },
    {
        id: 3,
        listname: '자전거 타기',
        date: '2021-09-29',
        active: false
    }
  ]);

  const count = useMemo(() => countActiveLists(dolists), [dolists]);

  return (
    <div class="App">
      <CreateList
        listname={listname}
        date={date}
        onChange={onChange}
        onCreate={onCreate}
      />
      <ToDoList dolists={dolists} onRemove={onRemove} onToggle={onToggle} />
      <div>활성리스트 수: {count}</div>
    </div>
    
  );
}

export default App;
