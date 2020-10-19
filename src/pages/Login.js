import { Button } from "@material-ui/core";
import React from "react";
import { auth, providerPublic } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";

function Login() {
  // dispatch used to update datalayer on StateProvider
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(providerPublic)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="giphy-embed">
          <iframe src="https://giphy.com/embed/QYkX9IMHthYn0Y3pcG"></iframe>
        </div>
        <div className="login__text">
          <h1>Group Chat App</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
