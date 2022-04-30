import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GoogleButton from "react-google-button";
import { auth, providerPublic } from "../../../firebase";
import { actionTypes } from "../../../store/reducer";
import { useStateValue } from "../../../store/StateProvider";
import "./style.css";

export default function Login() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();
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
    <Grid className="Login__Container" container sx={{ m: "auto" }}>
      <Grid className="Login__Images" item xs={12} md={6} />
      <Grid
        className="Login__Form"
        container
        item
        xs={12}
        md={6}
        justifyContent="center"
        alignContent="space-around"
        direction="column"
      >
        <Typography fontWeight="bold" className="Login__Text" variant="h2">
          WELCOME
        </Typography>
        <Typography className="Login__Text" variant="body1">
          Sign in to join {process.env.REACT_APP_NAME}
        </Typography>
        <GoogleButton className="Login__Button" onClick={signIn} />
      </Grid>
    </Grid>
  );
}
