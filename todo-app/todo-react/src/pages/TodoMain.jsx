import { useTodoContext } from "../contexts/TodoContext";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

function TodoMain() {
  const {
    todoList,
    inputTitle,
    inputContent,
    changeInputTitle,
    changeInputContent,
    insertTodo,
    changeIsComplete,
    deleteTodo,
  } = useTodoContext();

  return (
    <>
      <TodoList
        todos={todoList}
        onToggle={changeIsComplete}
        onDelete={deleteTodo}
      />
      <TodoForm
        title={inputTitle}
        content={inputContent}
        onTitleChange={changeInputTitle}
        onContentChange={changeInputContent}
        onSubmit={insertTodo}
      />
    </>
  );
}

export default TodoMain;
