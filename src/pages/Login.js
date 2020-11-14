import { auth, providerPublic } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";
import { LineRGB } from "../components/animations/animation";
import GoogleButton from "react-google-button";

export default function Login() {
  // Optimized soon
  const [{}, dispatch] = useStateValue();

  // Optimized soon
  const useStyles = LineRGB;
  useStyles();

  const LoginContainer = styled(Grid)({
    padding: "50px",
    margin: "20px",
    textAlign: "center",
    backgroundImage: "url('/login_background.jpg')",
    backgroundSize: "cover",
    backgroundColor: "#13683f",
    borderRadius: "25px",
    border: "4px ridge",
    animation: "lineRGB 1s infinite",
    transition: "all 1s ease-in-out",

    "&:hover": {
      boxShadow:
        "0px 0px 35px 0px rgba(0, 0, 0, 0.75), 0px 0px 120px 0px rgb(92, 209, 157)",
    },
  });

  const LoginText = styled(Typography)({
    margin: "25px auto",
    color: "white",
    fontFamily: "sans-serif",
    textShadow: "2px 2px rgba(0, 0, 0, 0.597)",
  });

  const LoginButton = styled(GoogleButton)({
    margin: "25px auto",
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
    <LoginContainer>
      <LoginText variant="h3">Group Chat App</LoginText>
      <LoginButton onClick={signIn} />
    </LoginContainer>
  );
}
