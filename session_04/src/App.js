import React, { useRef, useState, useMemo, useReducer, useCallback } from 'react';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import useInputs from './hooks/useInputs';
import './App.css';

function countActiveTodos(todos) {
  console.log('완료한 일 세는 중...');
  return todos.filter(todo => todo.active).length;
}

export const UserDispatch = React.createContext(null);

const initialState = {
  inputs: {
    calendar: '',
    dothing: ''
  },
  todos: [
    {
      id: 1,
      calendar: '2021-10-04',
      dothing: '운영체제원리',
      active: true
    },
    {
      id: 2,
      calendar: '2021-10-01',
      dothing: '네트워크',
      active: false
    },
    {
      id: 3,
      calendar: '2021-10-02',
      dothing: '멋쟁이사자처럼',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch(action.type) {
    case 'CREATE_todo':
      return {
        todos: state.todos.concat(action.todo)
      };
    case 'TOGGLE_todo':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, active: !todo.active } : todo)
      };
    case 'REMOVE_todo':
      return {
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const[{ calendar, dothing }, onChange, reset ] = useInputs({
    calendar: '',
    dothing: ''
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const{ todos } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_todo',
      todo: {
        id: nextId.current,
        calendar,
        dothing
      }
    });
    reset();
    nextId.current += 1;
  }, [calendar, dothing, reset]);

  const count = useMemo(() => countActiveTodos(todos), [todos]);
  return (
    <UserDispatch.Provider value = {dispatch}>
      <CreateTodo
        calendar={ calendar }
        dothing = { dothing }
        onChange={onChange}
        onCreate={onCreate}
      />
      <TodoList todos={todos}/>
      <div>완료한 항목 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
