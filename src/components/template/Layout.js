import { useEffect } from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase";
import { actionTypes } from "../../store/reducer";
import { useStateValue } from "../../store/StateProvider";
import Footer from "../organisms/Footer";
import { AppBackground, AppContainer } from "./style";
import Login from "../organisms/Login";

export default function Layout({ children }) {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      localStorage.setItem("user", JSON.stringify(authUser));
      dispatch({
        type: actionTypes.SET_USER,
        user: authUser,
      });
    });

    return () => listener();
  }, [dispatch]);

  return (
    <AppBackground container justifyContent="center" direction="column">
      <AppContainer>{user ? children : <Login />}</AppContainer>
      <Footer />
    </AppBackground>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
