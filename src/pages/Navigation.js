import { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
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

  const AppBackground = styled(Box)({
    backgroundImage:
      "linear-gradient(to right top, #4f4f4f, #65656d, #7a7c8c, #8f94ad, #a2adcf, #9fbde2, #9acdf2, #93deff, #74e7ff, #52f0fe, #37f8f2, #3dffdd)",
    height: "100vh",
    width: "100vw",
    overflow: "auto",
  });

  const AppContainer = styled(Container)({
    padding: "3em",
  });

  return (
    <AppBackground>
      <AppContainer>{!user ? <Login /> : <App />}</AppContainer>
    </AppBackground>
  );
}
