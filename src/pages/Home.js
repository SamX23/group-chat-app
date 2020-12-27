import { useEffect } from "react";
import { auth } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";
import App from "./App";
import Login from "./Login/Login";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";

export default function Home() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      localStorage.setItem("user", JSON.stringify(authUser));
      dispatch({
        type: actionTypes.SET_USER,
        user: authUser,
      });
    });

    return function () {
      listener();
    };
  }, [dispatch]);

  const AppBackground = styled(Grid)({
    backgroundColor: "#313131",
  });

  return (
    <AppBackground
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      {!user ? <Login /> : <App />}
    </AppBackground>
  );
}
