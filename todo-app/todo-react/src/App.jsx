import { useEffect, useState } from "react";
import "./App.css";
import { axiosApi } from "./api/axiosAPI";

function App() {
  const [todoList, setTodoList] = useState(null); // 할 일 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  const [inputTitle, setInputTitle] = useState(""); // 할 일 제목
  const [inputContent, setInputContent] = useState(""); // 할 일 내용

  // input 값을 할 일 제목으로
  const changeInputTitle = (e) => {
    setInputTitle(e.target.value);
  };

  // input 값을 할 일 내용으로
  const changeInputContent = (e) => {
    setInputContent(e.target.value);
  };

  // 할 일 추가
  const insertTodo = async () => {
    if (inputTitle.trim().length != 0 && inputContent.trim().length != 0) {
      // console.log(inputTitle);
      // console.log(inputContent);
      try {
        const resp = await axiosApi.post("/todo/insertTodo", {
          title: inputTitle,
          content: inputContent,
        });

        if (resp.status == 201) alert(resp.data);
        setInputTitle("");
        setInputContent("");
        getTodoList();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 할 일 조회
  const getTodoList = async () => {
    try {
      const resp = await axiosApi.get("/todo/getTodoList");

      if (resp.status == 200) {
        // console.log(resp.data);
        setTodoList(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodoList();
    // console.log("useEffect Run");
  }, []);

  useEffect(() => {
    if (todoList != null) setIsLoading(false);
    else setIsLoading(true);
  }, [todoList]);

  // 완료 여부 변경
  const changeIsComplete = async (e) => {
    const todoNo = e.target.value;
    const targetTodo = todoList.find((todo) => todo.todoNo == todoNo);

    if (!targetTodo) return;

    const updatedStatus = targetTodo.isComplete === "Y" ? "N" : "Y";

    try {
      // 서버로 변경 요청
      const resq = await axiosApi.put("/todo/changeIsComplete", {
        todoNo: todoNo,
        isComplete: updatedStatus,
      });

      if (resq.status == 200) {
        console.log(resq.data);
        // 클라이언트 상태 변경
        const updatedList = todoList.map((todo) =>
          todo.todoNo == todoNo ? { ...todo, isComplete: updatedStatus } : todo
        );

        setTodoList(updatedList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 할 일 삭제
  const deleteTodo = async (e) => {
    const todoNo = e.target.value;

    try {
      const resp = await axiosApi.put("/todo/deleteTodo", {
        todoNo,
      });

      if (resp.status == 200) console.log("delete complete");
      getTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  // 로딩중일때
  if (isLoading) return <h1>Loading...</h1>;

  // 할 일 목록 및 입력창 출력
  return (
    <>
      {todoList.length == 0 ? (
        <h1>할 일이 없습니다.</h1>
      ) : (
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
            {todoList.map((todo) => (
              <tr key={todo.todoNo}>
                <td>{todo.todoNo}</td>
                <td>{todo.title}</td>
                <td>{todo.content}</td>
                <td>{todo.enrollDate}</td>
                <td>
                  <button value={todo.todoNo} onClick={changeIsComplete}>
                    {todo.isComplete}
                  </button>
                </td>
                <td>
                  <button value={todo.todoNo} onClick={deleteTodo}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <input type="text" value={inputTitle} onChange={changeInputTitle} />
      <input type="text" value={inputContent} onChange={changeInputContent} />
      <button onClick={insertTodo}>제출하기</button>
    </>
  );
}

export default App;
