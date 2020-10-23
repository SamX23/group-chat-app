import { Button } from "@material-ui/core";
import React from "react";
import { auth, providerPublic } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";

export default function Login() {
  // dispatch used to update datalayer on StateProvider
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

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
    <div className="login">
      <div className="login__container">
        <div className="login__containerImage">
          <img
            src="https://media.giphy.com/media/QYkX9IMHthYn0Y3pcG/giphy.gif"
            alt="login gif"
          />
        </div>
        <div className="login__text">
          <h1>Group Chat App</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}
