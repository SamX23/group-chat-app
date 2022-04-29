import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import GoogleButton from "react-google-button";

export const LoginContainer = styled(Grid)({
  borderRadius: "15px",
  "&:hover": {
    boxShadow:
      "0px 0px 35px 0px rgba(0, 0, 0, 0.75), 0px 0px 60px 0px rgb(92, 209, 157)",
  },
  height: "75vh",
  transition: "all .5s ease-in-out",
});

export const LoginImages = styled(Grid)({
  backgroundImage: "linear-gradient(to right, #49a09d, #5f2c82)",
  borderRadius: "15px 0 0 15px",
});

export const LoginForm = styled(Grid)({
  borderRadius: "0 15px 15px 0",
  backgroundColor: "#d8e3e7",
});

export const LoginText = styled(Typography)({
  color: "black",
  textAlign: "center",
});

export const LoginButton = styled(GoogleButton)({
  margin: "25px auto",
});
