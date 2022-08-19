import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
  return (
    <Box sx={{ display: "flex", margin: "auto" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default Loading;
