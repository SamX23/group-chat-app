import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(result))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://image.freepik.com/free-vector/cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195.jpg"
          // https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png
          alt="Chat logo"
        />

        <div className="login__text">
          <h1>Sign in to chat!</h1>
        </div>

        <Button onClick={signIn}>
          <span role="img" aria-label="point">
            👉{" "}
          </span>
          <img className="login__googleIcon" src="" alt="icon" />
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
