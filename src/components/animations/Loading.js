import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

function Loading({ title }) {
  return (
    <Grid>
      <CircularProgress />
      <Box>{title || "Loading..."}</Box>
    </Grid>
  );
}

Loading.defaultProps = {
  title: "Component",
};

Loading.propTypes = {
  title: PropTypes.string,
};

export default Loading;
