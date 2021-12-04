import React, { useRef, useReducer, useMemo, useCallback, useState } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './hooks/useInputs';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';

import Dialog from './Dialog';

function countActiveUsers(users) {
  console.log('완료된 항목 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function countnonActiveUsers(users) {
  console.log('해야하는 항목 수를 세는 중...');
  return users.filter(user => !user.active).length;
}

const initialState = {
  dialog: false,
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
        ...state,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id),
      };

    case 'DIALOG_POPUP':
      return {
        ...state,
        dialog: true
      };

    case 'DIALOG_CONFIRM':
      return {
        ...state, 
        dialog: false
      };

    case 'DIALOG_CANCEL':
      return {
        ...state,
        dialog: false
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
  const { users, dialog } = state;
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
      <ThemeProvider
      theme={{
        palette: {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06569'
        }
      }}>
        <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
        >
          데이터를 정말로 삭제하시겠습니까?
        </Dialog>
      </ThemeProvider>
    </UserDispatch.Provider>
    
  );
}

export default App;