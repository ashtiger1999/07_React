import { useParams } from "react-router-dom";
import { useTodoContext } from "../contexts/TodoContext";
import TodoItem from "../components/TodoItem";

function TodoDetail() {
  const { todoNo } = useParams();
  const { todoList, changeIsComplete, deleteTodo } = useTodoContext();

  const todo = todoList.find((t) => String(t.todoNo) === todoNo);

  if (!todo) {
    return <p>해당 할 일을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <h2>할 일 상세 보기</h2>
      <p>할 일 번호: {todo.todoNo}</p>
      <table>
        <tbody>
          <TodoItem
            key={todo.todoNo}
            todo={todo}
            onToggle={changeIsComplete}
            onDelete={deleteTodo}
          />
        </tbody>
      </table>
    </div>
  );
}

export default TodoDetail;
