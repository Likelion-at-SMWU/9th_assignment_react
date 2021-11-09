import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './hooks/useInputs';
import './App.css';


function countActiveUsers(users) {
  console.log('완료된 항목 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function countnonActiveUsers(users) {
  console.log('해야하는 항목 수를 세는 중...');
  return users.filter(user => !user.active).length;
}

const initialState = {
  users: [
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
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    
    case 'REMOVE_USER':
      return {
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App(){
  const [{ whattodo, date }, onChange, reset] = useInputs({
    whattodo: '',
    date: ''
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        whattodo,
        date
      }
    });
    reset();
    nextId.current += 1;
  }, [whattodo, date, reset]);


  const finishedcount = useMemo(() => countActiveUsers(users), [users]);
  const needtodocount = useMemo(() => countnonActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        whattodo={whattodo}
        date={date}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users}/><br></br>
      <div id="finished">완료된 항목 수 : {finishedcount}</div>
      <div id="needtodo">해야할 항목 수: {needtodocount}</div>
    </UserDispatch.Provider>
  );
}

export default App;