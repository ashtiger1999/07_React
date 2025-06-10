import { createContext, useContext, useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  // 할일 목록
  const [todoList, setTodoList] = useState([]);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // input 할 일 제목
  const [inputTitle, setInputTitle] = useState("");

  // input 할 일 내용
  const [inputContent, setInputContent] = useState("");

  const changeInputTitle = (e) => setInputTitle(e.target.value);
  const changeInputContent = (e) => setInputContent(e.target.value);

  // 할 일 목록 조회
  const getTodoList = async () => {
    try {
      const resp = await axiosApi.get("/todo/getTodoList");
      if (resp.status === 200) setTodoList(resp.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 할 일 추가
  const insertTodo = async () => {
    if (inputTitle.trim() && inputContent.trim()) {
      try {
        const resp = await axiosApi.post("/todo/insertTodo", {
          title: inputTitle,
          content: inputContent,
        });

        if (resp.status === 201) alert(resp.data);
        setInputTitle("");
        setInputContent("");
        getTodoList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 완료 여부 변경
  const changeIsComplete = async (e) => {
    const todoNo = e.target.value;
    const targetTodo = todoList.find((todo) => todo.todoNo == todoNo);
    if (!targetTodo) return;

    const updatedStatus = targetTodo.isComplete === "Y" ? "N" : "Y";

    try {
      const resp = await axiosApi.put("/todo/changeIsComplete", {
        todoNo,
        isComplete: updatedStatus,
      });

      if (resp.status === 200) {
        const updatedList = todoList.map((todo) =>
          todo.todoNo == todoNo ? { ...todo, isComplete: updatedStatus } : todo
        );
        setTodoList(updatedList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 할 일 삭제
  const deleteTodo = async (e) => {
    const todoNo = e.target.value;
    try {
      const resp = await axiosApi.put("/todo/deleteTodo", { todoNo });
      if (resp.status === 200) getTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        isLoading,
        inputTitle,
        inputContent,
        changeInputTitle,
        changeInputContent,
        insertTodo,
        changeIsComplete,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
