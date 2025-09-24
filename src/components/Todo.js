import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

//Icons:

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function Todo() {
  return (
    <>
      <Card
        className="card"
        sx={{ minWidth: 275, margin: 5, background: "#283593", color: "white" }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8} sx={{ textAlign: "left", background: "" }}>
              <Typography variant="h5">My Tasks</Typography>
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
              <IconButton aria-label="delete">
                <CheckIcon
                  className="icon-btn"
                  sx={{
                    height: "50px",
                    width: "50px",
                    background: "white",
                    color: "#8bc34a",
                    border: "solid #8bc34a 3px",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
              <IconButton aria-label="delete">
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
              <IconButton aria-label="delete">
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
