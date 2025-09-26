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
import { useState, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { v4 as uuid } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [input, setInput] = useState("");
  const todosJsx = todos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  function addClickHandler() {
    setTodos([...todos, { id: uuid(), title: input, isCompleted: false }]);
    setInput("");
  }

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
            // value={alignment}
            exclusive
            //onChange={handleAlignment}
            aria-label="text alignment"
            style={{ marginTop: "30px" }}
          >
            <ToggleButton>All</ToggleButton>
            <ToggleButton>Completed</ToggleButton>
            <ToggleButton>UnCompleted</ToggleButton>
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
