import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <h1>할 일이 없습니다.</h1>;

  return (
    <table>
      <thead>
        <tr>
          <th>할 일 번호</th>
          <th>할 일 제목</th>
          <th>할 일 내용</th>
          <th>생성일</th>
          <th>완료여부</th>
          <th>편집</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem
            key={todo.todoNo}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
export default TodoList;
