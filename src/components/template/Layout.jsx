import { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { auth } from "../../firebase";
import { actionTypes } from "../../store/reducer";
import { useStateValue } from "../../store/StateProvider";
import Footer from "../organisms/Footer";
import Login from "../organisms/Login";

export default function Layout({ children }) {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      sessionStorage.setItem("user", JSON.stringify(authUser));
      dispatch({
        type: actionTypes.SET_USER,
        user: authUser,
      });
    });
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      sx={{ bgcolor: "#132c33", height: "100vh" }}
    >
      <Container maxWidth="md">{user ? children : <Login />}</Container>
      <Footer />
    </Grid>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
