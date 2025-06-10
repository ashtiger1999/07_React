import { useParams } from "react-router-dom";

function TodoDetail() {
  const { todoNo } = useParams();

  return (
    <div>
      <h2>할 일 상세 보기</h2>
      <p>할 일 번호: {todoNo}</p>
    </div>
  );
}

export default TodoDetail;
