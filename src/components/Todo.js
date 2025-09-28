import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
//Icons:

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

//others

import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todo, deleteClickHandler, updateClickHandler }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideSnackBar } = useToast();
  function checkClickHandler(todoId) {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return { ...todo };
      }
    });
    showHideSnackBar("the task was checked successfully!");
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  return (
    <>
      <Card
        className="card"
        sx={{ minWidth: 275, margin: 5, background: "#283593", color: "white" }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8} sx={{ textAlign: "left", background: "" }}>
              <Typography
                variant="h5"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
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
              {/* Edit Button */}
              <IconButton
                onClick={() => {
                  updateClickHandler(todo);
                }}
              >
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
              {/*=== Edit Button ===*/}
              {/* Delete Button */}
              <IconButton
                onClick={() => {
                  deleteClickHandler(todo);
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
              {/*=== Delete Button ===*/}
            </Grid>
            {/*=== Action Buttons ===*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
