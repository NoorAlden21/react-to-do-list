import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//Components
import Todo from "./Todo";

//others
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { v4 as uuid } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [input, setInput] = useState("");
  const [displayedTodos, setDisplayedTodos] = useState("all");

  function changeDisplayedTodos(e) {
    setDisplayedTodos(e.target.value);
  }

  let todosToBeRendered = todos;

  if (displayedTodos === "completed") {
    todosToBeRendered = todos.filter((t) => {
      return t.isCompleted;
    });
  } else if (displayedTodos === "unCompleted") {
    todosToBeRendered = todos.filter((t) => {
      return !t.isCompleted;
    });
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  function addClickHandler() {
    const newTodos = [
      ...todos,
      { id: uuid(), title: input, isCompleted: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setInput("");
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);
  return (
    <Container maxWidth="md">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2" fontWeight="bold">
            My Tasks
          </Typography>
          <Divider />

          {/* Filters */}

          <ToggleButtonGroup
            value={displayedTodos}
            exclusive
            onChange={changeDisplayedTodos}
            aria-label="text alignment"
            style={{ marginTop: "30px" }}
          >
            <ToggleButton value={"all"}>All</ToggleButton>
            <ToggleButton value={"completed"}>Completed</ToggleButton>
            <ToggleButton value={"unCompleted"}>UnCompleted</ToggleButton>
          </ToggleButtonGroup>
          {/*=== Filters ===*/}

          {/* Todos */}
          {todosJsx}
          {/*=== Todos ===*/}

          {/* Input + Add Button */}

          <Grid container spacing={2}>
            <Grid size={8}>
              <TextField
                id="outlined-basic"
                label="Task title"
                variant="outlined"
                style={{ width: "100%", height: "100%" }}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
              />
            </Grid>

            <Grid size={4}>
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  addClickHandler();
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/*=== Input + Add Button ===*/}
        </CardContent>
      </Card>
    </Container>
  );
}
