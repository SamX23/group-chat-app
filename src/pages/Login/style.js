import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";
import GoogleButton from "react-google-button";

export const LoginContainer = styled(Grid)({
  borderRadius: "1em",
  "&:hover": {
    boxShadow:
      "0px 0px 35px 0px rgba(0, 0, 0, 0.75), 0px 0px 120px 0px rgb(92, 209, 157)",
  },
  height: "75vh",
});

export const LoginImages = styled(Grid)({
  backgroundImage:
    "radial-gradient(circle, #ff5a5a, #ff4375, #fa3494, #e736b5, #c446d6, #a651d9, #8658d8, #655dd4, #605ab7, #5b569a, #55527e, #4f4d62)",
  borderRadius: "1em 0 0 1em",
});

export const LoginForm = styled(Grid)({
  borderRadius: "0 1em 1em 0",
  backgroundColor: "#d8e3e7",
});

export const LoginText = styled(Typography)({
  color: "black",
  fontFamily: "sans-serif",
  textAlign: "center",
});

export const LoginButton = styled(GoogleButton)({
  margin: "25px auto",
});
