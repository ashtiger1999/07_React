import { Routes, Route } from "react-router-dom";
import { useTodoContext } from "./contexts/TodoContext";
import TodoMain from "./pages/TodoMain";
import TodoDetail from "./pages/TodoDetail";
import "./App.css";

function App() {
  const { isLoading } = useTodoContext();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Routes>
      <Route path="/" element={<TodoMain />} />
      <Route path="/:todoNo" element={<TodoDetail />} />
    </Routes>
  );
}

export default App;
