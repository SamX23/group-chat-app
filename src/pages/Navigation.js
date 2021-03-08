import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import { auth } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";
import App from "./App";
import Login from "./Login/Login";

export default function Navigation() {
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
    backgroundImage:
      "linear-gradient(to right top, #4f4f4f, #65656d, #7a7c8c, #8f94ad, #a2adcf, #9fbde2, #9acdf2, #93deff, #74e7ff, #52f0fe, #37f8f2, #3dffdd)",
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
