import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { styled } from "@material-ui/core/styles";
import { auth } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";
import App from "../pages/App";
import Login from "../pages/Login/Login";

export default function Layout() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      localStorage.setItem("user", JSON.stringify(authUser));
      dispatch({
        type: actionTypes.SET_USER,
        user: authUser,
      });
    });

    return () => listener();
  }, [dispatch]);

  const AppBackground = styled(Grid)({
    backgroundColor: "#132c33",
    height: "100vh",
    width: "100vw",
  });

  const AppContainer = styled(Container)({
    padding: "3em",
  });

  return (
    <AppBackground container justify="center" direction="column">
      <AppContainer>{!user ? <Login /> : <App />}</AppContainer>
    </AppBackground>
  );
}
