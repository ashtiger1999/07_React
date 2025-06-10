import { NavLink } from "react-router-dom";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <tr>
      <td>{todo.todoNo}</td>
      <td>
        <NavLink to={`/${todo.todoNo}`}>{todo.title}</NavLink>
      </td>
      <td>{todo.content}</td>
      <td>{todo.enrollDate}</td>
      <td>
        <button value={todo.todoNo} onClick={onToggle}>
          {todo.isComplete}
        </button>
      </td>
      <td>
        <button value={todo.todoNo} onClick={onDelete}>
          삭제
        </button>
      </td>
    </tr>
  );
}
export default TodoItem;
