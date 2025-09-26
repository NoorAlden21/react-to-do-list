import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
//Icons:

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

//others

import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    description: todo.description,
  });

  function checkClickHandler(todoId) {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return { ...todo };
      }
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function deleteConfirmHandler() {
    const newTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos([...newTodos]);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function deleteClickHandler() {
    setOpenDeleteDialog(true);
  }

  function handleClose() {
    setOpenDeleteDialog(false);
  }

  function updateClickHandler() {
    setOpenEditDialog(true);
  }

  function handleUpdateDialogClose() {
    setOpenEditDialog(false);
  }

  function updateConfirmHanlder() {
    const newTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updateTodo.title,
          description: updateTodo.description,
        };
      } else {
        return t;
      }
    });
    setTodos([...newTodos]);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    handleUpdateDialogClose();
  }
  return (
    <>
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
      <Card
        className="card"
        sx={{ minWidth: 275, margin: 5, background: "#283593", color: "white" }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8} sx={{ textAlign: "left", background: "" }}>
              <Typography variant="h5">{todo.title}</Typography>
              <Typography variant="h5">{todo.description}</Typography>
            </Grid>

            {/* Action Buttons */}
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  checkClickHandler(todo.id);
                }}
              >
                <CheckIcon
                  className="icon-btn"
                  sx={{
                    height: "50px",
                    width: "50px",
                    background: todo.isCompleted ? "#8bc34a" : "white",
                    color: todo.isCompleted ? "white" : "#8bc34a",
                    border: "solid #8bc34a 3px",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
              <IconButton onClick={updateClickHandler}>
                <EditIcon
                  className="icon-btn"
                  sx={{
                    height: "50px",
                    width: "50px",
                    background: "white",
                    color: "#1769aa",
                    border: "solid #1769aa 3px",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  deleteClickHandler(todo.id);
                }}
              >
                <DeleteIcon
                  className="icon-btn"
                  sx={{
                    height: "50px",
                    width: "50px",
                    background: "white",
                    color: "#b23c17",
                    border: "solid #b23c17 3px",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </Grid>
            {/*=== Action Buttons ===*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
