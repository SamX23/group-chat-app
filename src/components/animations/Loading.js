import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  return (
    <Container maxWidth="sm">
      <CircularProgress />
    </Container>
  );
}
