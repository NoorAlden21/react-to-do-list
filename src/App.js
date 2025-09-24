import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList.js";
function App() {
  return (
    <div
      className="App"
      style={{
        background: "#191b1f",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TodoList />
    </div>
  );
}

export default App;
