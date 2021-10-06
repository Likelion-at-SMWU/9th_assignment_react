import React, { useRef, useState, useMemo } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import styles from './App.css';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function App() {

  const [inputs, setInputs] = useState({
    whattodo: '',
    date: ''
  });

  const { whattodo, date } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      whattodo: '멋사 과제하기',
      date: '2021-10-04',
      active: true
    },
    {
      id: 2,
      whattodo: '운영체제원리 강의듣기',
      date: '2021-10-03',
      active: false
    },
    {
      id: 3,
      whattodo: '컵라면 그만먹기',
      date: '2099-12-31',
      active: false
    },
    {
      id: 4,
      whattodo: '예싸비요우먼 예싸비요베베',
      date: 'everyday',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      whattodo,
      date
    };
    setUsers(users.concat(user));

    setInputs({
      whattodo: '',
      date: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만들기
    // = user.id 가 id인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };

  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user  
      )
    );
  };

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        whattodo={whattodo}
        date={date}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} /><br></br>
      <div id="finished">완료된 항목 수 : {count}</div>
    </>
  );
}

export default App;