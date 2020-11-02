import React from "react";
import { auth, providerPublic } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";

// Styling faster imported one by one
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
  const LoginBackground = styled(Box)({
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

  const LoginText = styled(Typography)({
    color: "white",
    fontFamily: "sans-serif",
    textShadow: "2px 2px rgba(0, 0, 0, 0.597)",
  });

  const LoginButton = styled(Button)({
    fontFamily: "'Rubik', sans-serif",
    padding: "15px",
    marginTop: "15px",
    fontWeight: "bold",
    fontSize: "15px",
    borderRadius: "10px",
    textTransform: "inherit !important",
    backgroundColor: "#0a8d4d !important",
    color: "white",
    transitionDuration: "1s",
    "&:active": {
      position: "relative",
      top: "2px",
    },

    "&:hover": {
      backgroundColor: "green !important",
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
    <LoginBackground>
      <LoginContainer maxWidth="sm">
        <LoginText variant="h3">Group Chat App</LoginText>
        <LoginButton onClick={signIn}>Sign In With Google</LoginButton>
      </LoginContainer>
    </LoginBackground>
  );
}
