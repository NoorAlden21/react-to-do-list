import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/TodosContext.js";

import { v4 as uuid } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});

const initialTodos = [
  {
    id: uuid(),
    title: "Reading 3 books",
    description: "Should finish this task this month",
    isCompleted: false,
  },
  {
    id: uuid(),
    title: "Reading 3 books",
    description: "Should finish this task this month",
    isCompleted: false,
  },
  {
    id: uuid(),
    title: "Reading 3 books",
    description: "Should finish this task this month",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
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
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
