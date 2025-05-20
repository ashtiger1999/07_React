// 함수형 컴포넌트 예제
import { useState, useEffect } from "react";
const Exam2 = (props) => {
  // 상태
  const [count, setCount] = useState(0);

  // 마운트, 업데이트, 언마운트 제어
  // useEffect() : 함수형 컴포넌트에서 렌더링 이후 실행되는 코드(부수 효과)를 작성할 때
  // 사용하는 Hook
  useEffect(() => {
    // 컴포넌트가 렌더링된 후 실행됨
    console.log("마운트 완료 또는 업데이트 됨");

    return () => {
      // 정리 코드(clean-up 코드) : 언마운트 시 실행
      console.log("언마운트 됨");
    };
  }, [count]);
  // 의존성 배열([])
  // -> 빈 배열을 넣으면, 마운트 시 1회 실행 + 언마운트 시 return 구문 1회 실행됨
  // 의존성 배열에 있는 값이 변경될 때마다
  // 1. 이전의 코드를 클린업
  // 2. 새로운 코드를 마운트

  const handleClick = () => {
    setCount(count + 1);
  };

  // 렌더링
  return (
    <div>
      <h1>Count : {count}</h1>
      <button onClick={handleClick}>Increase Btn</button>
      <h2>부모가 준거 : {props.jaeho}</h2>
    </div>
  );
};

export default Exam2;
