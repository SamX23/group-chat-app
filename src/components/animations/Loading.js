import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styled } from "@material-ui/core/styles";
import PropTypes from "prop-types";

function Loading({ title }) {
  const LoadingArea = styled(Grid)({
    margin: "auto",
    textAlign: "center",
  });

  return (
    <LoadingArea
      justify="center"
      alignContent="space-around"
      direction="column"
    >
      <CircularProgress />
      <Box>{title || "Loading..."}</Box>
    </LoadingArea>
  );
}

Loading.defaultProps = {
  title: "Component",
};

Loading.propTypes = {
  title: PropTypes.string,
};

export default Loading;
