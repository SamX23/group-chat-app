import { useEffect } from "react";
import { auth } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";
import App from "./App";
import Login from "./Login";
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

  const LoginBackground = styled(Grid)({
    backgroundImage:
      "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
  });

  return (
    <LoginBackground
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      {!user ? <Login /> : <App />}
    </LoginBackground>
  );
}
