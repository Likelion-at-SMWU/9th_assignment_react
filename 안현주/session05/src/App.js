import React, { useRef, useState, useReducer, useMemo, useCallback } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './hooks/useInputs';

import styled, { ThemeProvider } from 'styled-components';
import Button from './Button'
import Dialog from './Dialog';


/*
과제 미완 - 
(1) 텍스트필드에 작성이 안된다. ---> 이유가 뭘까 
*/


function countActiveUsers(users){
  console.log('완료한 수를 세는 중 ...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    todo : '',
    date: ''
  },
  
  users : [
    {
      id:1,
      todo:'멋사 세션 진행하기',
      date:'2021-11-02',
      active: true
    },
    {
      id:2,
      todo:'걸어서 운동가기',
      date:'2021-11-03',
      active: true
    },
    {
      id:3,
      todo:'sesson 5번째 과제 마감',
      date:'2021-11-01',
      active: false
    }
  ]
};

//Custom Hooks
function reducer(state, action){
  switch (action.type) {
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name] : action.value
    //     }
    //   };
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER' :
      return {
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user)
      };
    case 'REMOVE_USER' :
      return {
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);



//Button
// const AppBlock = styled.div`
//     width: 512px;
//     margin: 0 auto;
//     margin-top: 4rem;
//     border: 1px solid black;
//     padding: 1rem;
// `;

// //Button Size
// const ButtonGroup = styled.div`
//   & + & {
//     margin-top: 1rem;
//   }
// `;



function App() {

  const [{todo, date}, onChange, reset] = useInputs({
    todo: '',
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
        todo,
        date
      }
    });
    reset();
    nextId.current  += 1;
  }, [todo, date, reset]);

  const count = useMemo(() => countActiveUsers(users),  [users] );


  //Button
  // const [dialog, setDialog] = useState(false);
  // const onClick = () => {
  //   setDialog(true);
  // };
  // const onConfirm = () => {
  //   console.log('삭제');
  //   setDialog(false);
  // };
  // const onCancel = () => {
  //   console.log('취소');
  //   setDialog(false);
  // };



  return (
    // <>
    //   <ThemeProvider
    //     theme={{
    //       palette: {
    //         blue: '#228be6',
    //         gray: '#495057',
    //         pink: '#f06595',
    //         green: '#008000',
    //       }
    //     }}
    //   >

    //     <AppBlock>
    //      <ButtonGroup>
    //        <Button size="large" onClick={onClick}>삭제</Button>
    //      </ButtonGroup>
    //     </AppBlock>


    //     <Dialog
    //       title="정말로 삭제하시겠습니까?"
    //       confirmText="삭제"
    //       cancelText="취소"
    //       onConfirm={onConfirm}
    //       onCancel={onCancel}
    //       visible={dialog}
    //     >
    //       데이터를 정말로 삭제하시겠습니까?
    //     </Dialog>
    //   </ThemeProvider>
      // </>


 
      <div class="align-center">
        <UserDispatch.Provider value={dispatch}>
          <h2> 오늘의 할일 </h2>
          <CreateUser
            todo={todo}
            date={date}
            onChange={onChange}
            onCreate={onCreate} />

          <UserList users={users} />

          <div> 완료한 할일 수: {count} </div>

        </UserDispatch.Provider>
      </div>
      
    
  );

}

export default App;
