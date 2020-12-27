import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";
import GoogleButton from "react-google-button";

// Optimized soon
export const LoginContainer = styled(Grid)({
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

export const LoginText = styled(Typography)({
  margin: "25px auto",
  color: "white",
  fontFamily: "sans-serif",
  textShadow: "2px 2px rgba(0, 0, 0, 0.597)",
});

export const LoginButton = styled(GoogleButton)({
  margin: "25px auto",
});
