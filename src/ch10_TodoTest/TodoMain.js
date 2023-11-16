// 부모 : App, 자식 : TodoMain
// 자식 : TodoMain (베이스 컴포넌트)
// 전체 가운데 요소로 정렬 시켜주는 템플릿 :TodoBase
// 1)제목 2) 입력란:TodoInsert 3) 리스트 4) 리스트의 아이템 등.

import React, { useCallback, useRef, useReducer } from "react";
import styled from "styled-components";
// import { AiFillApple } from "react-icons/ai";
import TodoBase from "./TodoBase";
import TodoInsert from "./TodoInsert";

import TodoList from "./TodoList";

const MainCss = styled.div`
  margin: 0;
  padding: 0;
  //회색, 배경색은 나중에 본인이 좋아하는 색으로 변경.
  background: #e9ecef;
`;

// Todo 만들기 준비 메인 <AiFillApple />
const TodoMain = () => {
  //문제점 제시, 더미 데이터 약 3000개로 추가하고,
  //느려지는 부분 만든 후, 확인, 적용해보기.

  const createBulkTodos = () => {
    const array = [];
    for (let i = 1; i <= 20000; i++) {
      array.push({
        id: i,
        text: `더미 데이터 : ${i}`,
        checked: false,
      });
    }
    return array;
  };

  // 3000개 더미 데이터라서, 다음 번호
  const nextId = useRef(20001);

  //1) 리듀서 함수
  const todoReducer = (todos, action) => {
    switch (action.type) {
      case "INSERT":
        return todos.concat(action.todo);
      case "REMOVE":
        return todos.filter((todo) => todo.id !== action.id);
      case "TOGGLE":
        return todos.map((todo) =>
          todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
        );
      default:
        return todos;
    }
  };

  // 2) useReducer 생성 -> 기존에 더미 데이터를 만드는 부분이 있어서, 위에 부분 주석하기.
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        //  const nextId = useRef(4); 4부터 할당.
        id: nextId.current,
        text,
        checked: false,
      };

      // 3) dispatch 함수를 호출.
      dispatch({ type: "INSERT", todo });

      nextId.current += 1;
    },
    // [todos]
    // 성능 개선 2번째,  의존성 배열 부분 비우기.
    []
  );

  const onRemove = useCallback(
    (id) => {
      // 3) dispatch 함수를 호출.
      dispatch({ type: "REMOVE", id });
    },
    // [todos]
    // 의존성 배열 없이 동작.
    []
  );

  //토글(스위치, on/off), checkbox 부분에 , 이벤트 핸들러 추가하기.
  // onToggle 이라는 이름. 함수를 자식 컴포넌트에게 전달하기.
  // 설정, 순서1
  const onToggle = useCallback(
    (id) => {
      // 3) dispatch 함수를 호출.
      dispatch({ type: "TOGGLE", id });
    },
    // [todos]
    // 성능개선 2번째, 의존성 배열 없애기.
    []
  );

  return (
    <MainCss>
      <TodoBase>
        {/* 위에서 만든 useCallback 함수를 자식 컴포넌트에게 전달하기. */}
        <TodoInsert onInsert={onInsert} />
        {/* 위에서 만든 임시 데이터 배열를 전달 : props 속성으로 전달 */}
        {/* 제거하는 함수를 props를 이용해서, 전달 */}
        {/* 순서2, 적용하기. 체크하는 함수를 props를 이용해서, 전달 */}
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoBase>
    </MainCss>
  );
};

export default TodoMain;
