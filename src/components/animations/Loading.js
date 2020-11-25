import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading({ title }) {
  return (
    <Grid>
      <CircularProgress />
      <Box>{title || "Loading..."}</Box>
    </Grid>
  );
}
