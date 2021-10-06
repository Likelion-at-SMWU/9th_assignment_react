import React, { useRef, useState, useMemo, useCallback } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는 중 ...');
  return users.filter(user => user.active).length;
}

 
//date 항목 : 날짜 (date)
//todo 항목 : 할일 (todo)

function App() {
  const [users, setUsers] = useState([
    {
      id:1,
      todo:'멋사 세션 진행하기',
      date:'2021-09-28',
      active: true
    }
  ]);

  const [inputs, setInputs] = useState({
    date : '',
    todo:''
  });

  const { date, todo } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };


  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      date,
      todo
    };
    // setUsers([...users, user]);
    setUsers(users.concat(user));

    setInputs({
      date:'',
      todo:''
    });
    nextId.current +=1;
  }, [users, date, todo]);


  const onRemove = useCallback( id  => {
    setUsers(users.filter(user => user.id !== id));
  },
  [users]
  );

  const onToggle = useCallback( 
    id => {
    setUsers(
      users.map(user =>
        user.id === id? {...user, active: !user.active} : user
        )
      );
  },
  [users]
  );

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div class="align-center">
      <CreateUser
        date={date}
        todo={todo}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div >완료한 항목 수 : {count}</div>
    </div>
  );

}

export default App;
