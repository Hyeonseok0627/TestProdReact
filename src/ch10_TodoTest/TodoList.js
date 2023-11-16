import React, { useCallback } from "react";

import TodoListItem from "./TodoListItem";

// 페이징 처리 해주는 가상의 리스트 불러오기
// import { List } from "react-virtualized";
import { List } from "react-virtualized";

const TodoList = ({ todos, onRemove, onToggle }) => {
  // react-virtualized 이용해서, 페이징 하기, 현재, 리스트 목록부분만의 사이즈 : 512x 513 ( 9개기준)
  // 하나의 높이를 대략 : 57px 정함. (57*9 = 513)
  // rowRender , 가상의 행을 나타내는 함수 정의하기.
  const rowRender = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );

  return (
    // 기존의 리스트 -> 가상의 리스트로 교체 후
    //  css 속성 추가하기
    // <TodoListCss>
    // 부모 리스트에서 props로 담아서, TodoListItem 전달하기.
    <List
      width={512}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      //오타 수정. rowRender -> rowRenderer
      rowRenderer={rowRender}
      list={todos}
      style={{ outline: "none" }}
    />
  );
};
// 추가하기.
export default React.memo(TodoList);
