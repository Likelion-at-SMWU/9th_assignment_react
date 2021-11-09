import ToDoList from './ToDoList';
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import CreateList from './CreateList';
import useInputs from './hooks/useInputs';
import './App.css';

function countActiveLists(dolists) {
  console.log('활성 리스트 수를 세는 중...');
  return dolists.filter(todo => todo.active).length;
}

const initialState = {
  inputs: {
    listname: '',
    date: ''
  },
  dolists: [
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
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_LIST':
      return {
        dolists: state.dolists.concat(action.todo)
      };
    case 'TOGGLE_LIST':
      return {
        dolists: state.dolists.map(todo =>
          todo.id === action.id ? { ...todo, active: !todo.active } : todo
        )
      };
    case 'REMOVE_LIST':
      return {
        dolists: state.dolists.filter(todo => todo.id !== action.id)
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [{ listname, date }, onChange, onReset] = useInputs({
    listname: '',
    date: ''
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const { dolists } = state;

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_LIST',
      todo: {
        id: nextId.current,
        listname,
        date
      }
    });
    onReset();
    nextId.current += 1;
  }, [listname, date, onReset]);

  const count = useMemo(() => countActiveLists(dolists), [dolists]);

  return (
    <div class="App">
      <UserDispatch.Provider value={dispatch}>
        <CreateList
          listname={listname}
          date={date}
          onChange={onChange}
          onCreate={onCreate}
        />
        <ToDoList dolists={dolists} />
        <div>활성리스트 수: {count}</div>
      </UserDispatch.Provider>
      
    </div>
    
  );
}

export default App;
