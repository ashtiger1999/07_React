import { useState } from "react";
import "./App.css";

import Exam7 from "./component/Exam7";

function App() {
  // 상태(state)
  const [showExam, setShowExam] = useState(true);

  return (
    // js 주석
    // <></> : fragment (html 역할 X)

    /* 
      jsx 주석 (ctrl + /) 
      <>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
      </>
    */

    // <>
    //   <button onClick={() => setShowExam(!showExam)}>CLICK</button>

    //   {showExam && <Exam2 jaeho="jaeho" test="test" />}
    // </>

    // <Exam3 />

    // <Exam4 />

    // <Exam5 />

    // <Exam6 />

    <Exam7 />
  );
}

export default App;
