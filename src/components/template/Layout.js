import { useEffect } from "react";
import { auth } from "../../firebase";
import { actionTypes } from "../../store/reducer";
import { useStateValue } from "../../store/StateProvider";
import App from "../pages";
import Login from "../pages/Login";
import Footer from "../organisms/Footer";
import { AppBackground, AppContainer } from "./style";

export default function Layout() {
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
      <AppContainer>{!user ? <Login /> : <App />}</AppContainer>
      <Footer />
    </AppBackground>
  );
}
