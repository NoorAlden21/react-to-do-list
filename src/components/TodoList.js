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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//Components
import Todo from "./Todo";

//others
import { useState, useContext, useEffect, useMemo } from "react";
import { useTodos } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

export default function TodoList() {
  const [input, setInput] = useState("");
  const [displayedTodos, setDisplayedTodos] = useState("all");
  const { showHideSnackBar } = useToast();
  const { todos, dispatch } = useTodos();

  const [currentTodo, setCurrentTodo] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: currentTodo.title,
    description: currentTodo.description,
  });

  function changeDisplayedTodos(e) {
    setDisplayedTodos(e.target.value);
  }

  let todosToBeRendered = todos;

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const unCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  if (displayedTodos === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodos === "unCompleted") {
    todosToBeRendered = unCompletedTodos;
  }

  function addClickHandler() {
    dispatch({ type: "added", payload: { title: input } });
    setInput("");
    showHideSnackBar("new task has been added successfully!");
  }

  useEffect(() => {
    dispatch({
      type: "fetched",
    });
  }, []);

  //Handlers

  function handleClose() {
    setOpenDeleteDialog(false);
  }

  function deleteClickHandler(todo) {
    setCurrentTodo(todo);
    setOpenDeleteDialog(true);
    console.log(todo);
  }

  function deleteConfirmHandler() {
    dispatch({ type: "deleted", payload: { currentTodo } });
    showHideSnackBar("the task has been removed successfully!");
    handleClose();
  }

  function handleUpdateDialogClose() {
    setOpenEditDialog(false);
  }

  function updateClickHandler(todo) {
    setCurrentTodo(todo);
    setUpdateTodo({
      title: todo.title,
      description: todo.description,
    });
    setOpenEditDialog(true);
  }

  function updateConfirmHanlder() {
    dispatch({
      type: "updated",
      payload: {
        currentTodo,
        updateTodo,
      },
    });
    showHideSnackBar("the task has been updated successfully!");
    handleUpdateDialogClose();
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        deleteClickHandler={deleteClickHandler}
        updateClickHandler={updateClickHandler}
      />
    );
  });

  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
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
                  disabled={!input}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            {/*=== Input + Add Button ===*/}
          </CardContent>
        </Card>
      </Container>
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleUpdateDialogClose}>
        <DialogTitle id="alert-dialog-title">Updating the task</DialogTitle>
        <DialogContent>
          <form onSubmit={updateConfirmHanlder} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={updateTodo.title}
              onChange={(event) => {
                setUpdateTodo({ ...updateTodo, title: event.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={updateTodo.description}
              onChange={(event) => {
                setUpdateTodo({
                  ...updateTodo,
                  description: event.target.value,
                });
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Close</Button>
          <Button
            autoFocus
            onClick={() => {
              updateConfirmHanlder();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Edit Dialog ===*/}
      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            autoFocus
            onClick={() => {
              deleteConfirmHandler();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Delete Dialog ===*/}
    </>
  );
}
