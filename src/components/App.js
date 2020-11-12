import React, { useEffect } from "react";
import { auth } from "../firebase";

import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";

import Footer from "./Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Grid } from "@material-ui/core";

export default function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      localStorage.setItem("user", JSON.stringify(authUser));

      dispatch({
        type: actionTypes.SET_USER,
        user: authUser,
      });
    });

    return function () {
      listener();
    };
  }, [dispatch]);

  return (
    <Grid>
      {!user ? <Login /> : <Home />}
      <Footer />
    </Grid>
  );
}
