import React, { useRef, useReducer, useMemo, useCallback } from'react';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';
import './App.css';
import useInputs from './hooks/useInputs';

const initialState = {
  todos: [
    {
      id: 1,
      item: '멋사 과제하기',
      date: '2021-10-04',
      complete: true
    },
    {
      id: 2,
      item: '스우파 보기',
      date: '2021-10-05',
      complete: false
    },
    {
      id: 3,
      item: '방청소 하기',
      date: '2021-10-11',
      complete: false
    }
  ]
};

function countCompleteTodos(todos) {
  console.log('완료된 to do 수를 세는 중...');
  return todos.filter(todo => todo.complete).length;
}

function countNotDoneTodos(todos) {
  console.log('완료되지 않은 to do 수를 세는 중...');
  return todos.filter(todo => ! todo.complete).length;
}

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_TODO':
      return {
        todos: state.todos.concat(action.todo)
      };

    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.id)
      };

    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
        )
      };

    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  //과제2. 커스텀 hooks 만들어서 사용
  const [{ item, date }, onChange, onReset] = useInputs({
    item: '',
    date: ''
  });

  const [state, dispatch] = useReducer(reducer, initialState);  //useState 대신 useReducer 사용

  const { todos } = state;
  const nextId = useRef(4);

  const onCreate = useCallback(() => {  //과제1. 코드 최적화하기(UseCallback)
    dispatch({
      type: 'CREATE_TODO',
      todo: {
        id: nextId.current,
        item,
        date
      }
    });

    onReset();  //커스텀 훅(useInputs)의 초기화 함수 사용

    nextId.current += 1;
  }, [item, date, onReset]);

  const countComplete = useMemo(() => countCompleteTodos(todos), [todos]);
  const countNotDone = useMemo(() => countNotDoneTodos(todos), [todos]);

  return (
    //과제3. Context Api 또는 immer 사용(Context Api)
    <UserDispatch.Provider value={dispatch}>
      <div class="App">
        <TodoList todos={todos}/>
        <CreateTodo item={item} date={date} onChange={onChange} onCreate={onCreate} />
        <div class="count">해야 할 일: <span class="important">{countNotDone}</span> / 완료한 할 일: {countComplete}</div>
      </div>
    </UserDispatch.Provider>
  );
}

export default App;
