// JSX 예제

import { useState } from "react";
import testImg from "../assets/어떡하지.gif";

const Exam5 = () => {
  //   return <Exam5_1 />;
  //   return <Exam5_2 />;
  const [isLogin, setIsLogin] = useState(false);

  return <Exam5_3 isLogin={isLogin} setIsLogin={setIsLogin} />;
  //   return <Exam5_4 isLogin={true} />;
  //   return <Exam5_5 />;
};

// JSX 예제 1 : 자바스크립트 변수로 사용하기
const Exam5_1 = () => {
  const name = "React";
  const element = <h1>Hello, {name}</h1>;

  return element;
};

// JSX 예제 2 : img 태그 이미지 사용
const Exam5_2 = () => {
  const [userImg, setUserImg] = useState(testImg);

  return <img src={userImg} />;
};

// JSX 예제 3 : 로그인 여부에 따라 화면 다르게 보이기
const Exam5_3 = (props) => {
  let result;

  // 조건문 사용
  if (props.isLogin) {
    result = <h1>Welcome</h1>;
  } else {
    result = <h1>Login First</h1>;
  }

  return (
    <button onClick={() => props.setIsLogin(!props.isLogin)}>{result}</button>
  );
};

// JSX 예제 4 : 삼항연산자로 로그인 여부에 따라 화면 다르게 보이기
const Exam5_4 = (props) => {
  return <h1>{props.isLogin ? "환영합니다" : "로그인 바람"}</h1>;
};

// JSX 예제 5 : 배열을 이용한 화면 렌더링 방법(***중요 : 자주 사용***)
// - 클라이언트(React) <-> 서버(SpringBoot)
// - 서버에서 응답받은 데이터는 대부분 배열(List) 형태
const Exam5_5 = () => {
  // 서버에서 아래 배열(list)를 응답받았다고 가정
  const members = ["짱구", "유리", "철수", "훈이", "맹구"];

  // JS 내장 함수 중, map
  // 배열을 하나씩 순차접근해서 콜백함수 내에 있는 내용 수행 후
  // 새로운 배열을 만들어 반환
  const listItems = members.map((member, index) => (
    <li key={index}>{member}</li>
  ));

  // Each child in a list should have a unique "key" prop.
  // -> React에서 동적인 리스트를 렌더링할 때
  // 각 자식 컴포넌트가 고유한 key 속성을 가져야 한다는 규칙 위배시 발생하는 경고
  // 고유한 key 값 작성하면 경고 해결 => 보통 key값은 index값으로 사용함

  return <ul>{listItems}</ul>;
};

export default Exam5;
