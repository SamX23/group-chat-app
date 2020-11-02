import React from "react";
import { auth, providerPublic } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";

import { Container, Box, Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { LineRGB } from "../styles/animation";

export default function Login() {
  // dispatch used to update datalayer on StateProvider
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  // Optimized soon
  const useStyles = LineRGB;
  useStyles();

  // Styling
  const Login = styled(Box)({
    backgroundImage:
      "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
    height: "100vh",
    width: "100vw",
    display: "grid",
    placeItems: "center",
  });

  const LoginContainer = styled(Container)({
    padding: "100px",
    textAlign: "center",
    backgroundImage: "url('/login_background.jpg')",
    backgroundSize: "cover",
    backgroundColor: "#13683f",
    borderRadius: "25px",
    border: "4px ridge",
    animation: "lineRGB 1s infinite",
    transition: "all 0.3s ease-in-out",

    "&:hover": {
      boxShadow:
        "0px 0px 35px 0px rgba(0, 0, 0, 0.75), 0px 0px 120px 0px rgb(92, 209, 157)",
    },
  });

  const signIn = () => {
    auth
      .signInWithPopup(providerPublic)
      .then((authUser) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Login>
      <LoginContainer maxWidth="sm" className={LineRGB}>
        <Box className="login__text">
          <h1>Group Chat App</h1>
        </Box>
        <Box className="login__button">
          <Button onClick={signIn}>Sign In With Google</Button>
        </Box>
      </LoginContainer>
    </Login>
  );
}
