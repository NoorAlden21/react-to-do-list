import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";

export default function TodoList() {
  return (
    <Container maxWidth="md">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2">My Tasks</Typography>
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
          <Todo />
          {/*=== Todos ===*/}
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
