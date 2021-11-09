import './App.css';
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import ToDoList from './ToDoList';
import CreateToDo from './CreateToDo';
import useInputs from './hooks/useInputs';
import Today from './Today';
import styled, { ThemeProvider } from 'styled-components';
import Button from './Button';

function countTodo(does) {
  console.log('완료한 할 일 개수를 세는 중...');
  return does.filter(todo => todo.active).length;
}

function uncountTodo(does) {
  console.log('남은 할 일 개수를 세는 중...');
  return does.filter(todo => !todo.active).length;
}

const initialState = {
  inputs: {
    list: '',
    date: ''
  },
  does: [
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
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
      case 'CREATE_TODO':
        return {
          does: state.does.concat(action.todo)
        };
      case 'TOGGLE_TODO':
        return {
          does: state.does.map(todo =>
            todo.id === action.id ? { ...todo, active: !todo.active } : todo)
        };
      case 'REMOVE_TODO':
        return {
          does: state.does.filter(todo => todo.id !== action.id)
        };
      default:
        return state;
  }
}

export const TodoDispatch = React.createContext(null);

function App() {
  const [{ list, date }, onChange, reset] = useInputs({
    list: '',
    date: ''
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const{ does } = state;
  
  const nextId = useRef(5);
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_TODO',
      todo: {
        id: nextId.current,
        list,
        date
      }
    });
    reset();
    nextId.current += 1;
  }, [list, date, reset]);

  const count = useMemo(() => countTodo(does), [does]);
  const uncount = useMemo(() => uncountTodo(does), [does]);
  return (
    <div class="whole">
      <TodoDispatch.Provider value={dispatch}>
      <h1>Seokyeong's ToDoList</h1>
      <Today/>
      <CreateToDo
        list={list}
        date={date}
        onChange={onChange}
        onCreate={onCreate}
      />
      <br/>
      <ToDoList does={does} />
      <br/>
      <span id="done">완료한 할 일: {count}개</span>&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span id="remain">남은 할 일: {uncount}개</span>
      </TodoDispatch.Provider>
    </div> 
  );  
}

export default App;
