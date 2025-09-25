import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});

function App() {
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
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
