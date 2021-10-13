import React, { useRef, useReducer, useMemo, useCallback } from'react';
import { ThemeProvider } from 'styled-components';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';
import './App.css';
import useInputs from './hooks/useInputs';
import Dialog from './Dialog';

//11/2 과제: 버튼 2개 이상 CSS 추가하기 (일정 추가하는 버튼, 삭제 다이얼로그 취소/확인 버튼)

const initialState = {
  dialog: false,

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
        ...state,
        todos: state.todos.concat(action.todo)
      };

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
        )
      };

      case 'DISPLAY_DIALOG':
        return {
          ...state,
          dialog: true
        };

      case 'DIALOG_CANCEL':
        console.log('일정 삭제 취소');
        return {
          ...state,
          dialog: false
        };
      case 'DIALOG_CONFIRM':
        console.log('일정 삭제 결정');
        return {
          ...state,
          dialog: false
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

  const { todos, dialog } = state;
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
      <ThemeProvider
        theme={{
          palette: {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06595'
          }
        }}
      >
        <div className="App">
          <TodoList todos={todos}/>
          <CreateTodo item={item} date={date} onChange={onChange} onCreate={onCreate} />
          <div className="count">해야 할 일: <span className="important">{countNotDone}</span> / 완료한 할 일: {countComplete}</div>
        </div>
        <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          visible={dialog}
        >
          해당 일정을 정말로 삭제하시겠습니까?
        </Dialog>
      </ThemeProvider>
    </UserDispatch.Provider>
  );
}

export default App;
