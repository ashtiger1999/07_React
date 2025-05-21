import { useState } from "react";

// 상태 끌어올리기(State Lifting Up) :
// 자식 컴포넌트의 상태를 부모에게 끌어올려 부모가 이용 가능하도록 해주는 것

// 부모 컴포넌트
const Exam4 = () => {
  // 상태
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // id 상태를 업데이트 해주는 함수
  const onChangeId = (e) => {
    setId(e.target.value);
  };

  // pw 상태를 업데이트 해주는 함수
  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  return (
    <div>
      <Id onChangeId={onChangeId} />
      <Pw onChangePw={onChangePw} />
      <div>
        {/*
            자식이 가진 id, pw라는 상태값을 부모 컴포넌트가 알 방법이 없음
            -> 부모 컴포넌트로 자식의 상태, 함수를 끌어올려 사용
        */}
        <button disabled={id.trim().length == 0 || pw.trim().length == 0}>
          Login
        </button>
      </div>
    </div>
  );
};

// 자식 컴포넌트 Id
const Id = (props) => {
  return (
    <div>
      <label>ID : </label>
      <input onChange={props.onChangeId} />
    </div>
  );
};

// 자식 컴포넌트 Pw
const Pw = (props) => {
  return (
    <div>
      <label>PW : </label>
      <input onChange={props.onChangePw} />
    </div>
  );
};

export default Exam4;
