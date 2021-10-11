import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './hooks/useInputs';


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
      date:'2021-09-28',
      active: true
    }
  ]
};

//Custom Hooks
function reducer(state, action){
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name] : action.value
        }
      };
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER' :
      return {
        users: state.usersmap(user =>
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

  return (
    <div class="align-center">
      <UserDispatch.Provider value = {dispatch}>
        <h2> 오늘의 할일 </h2>
        <CreateUser
          todo={todo}
          date={date}
          onChange={onChange}
          onCreate={onCreate}
        />

        <UserList users={users}/>
      
        <div> 완료한 할일 수: {count} </div>
      </UserDispatch.Provider>
    </div>
  );

}

export default App;
