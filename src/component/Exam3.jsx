import { useState } from "react";

// 상태 내리꽂기(Props Drilling) :
// 부모가 가진 데이터를 자식에게 전달해서 자식이 사용할 수 있게끔 하는 것

// 부모 컴포넌트
const Exam3 = () => {
  const [name, setName] = useState("홍길동");

  // 기본적인 값은 쌍따옴표("") 안에 작성
  // 값, 또는 변수는 중괄호({}) 안에 작성
  return <Child1 userName={name} age={10} gender="남자" />;
  // 자식 컴포넌트 Child1에 부모의 상태인 name을
  // username이라는 key에 세팅하여 props를 통해 전달
};

// 자식 컴포넌트
const Child1 = (props) => {
  return (
    <div>
      <p>이름 : {props.userName}</p>
      <p>나이 : {props.age}</p>
      <p>성별 : {props.gender}</p>

      <Child2 name={props.userName} />
    </div>
  );
};

// 자식의 자식 컴포넌트
const Child2 = ({ name }) => {
  // props 대신 {key}로 값을 꺼내올 수 있음
  return <p>{name}</p>;
};

export default Exam3;
