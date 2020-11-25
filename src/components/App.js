import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { auth } from "../firebase";
import { actionTypes } from "../store/reducer";
import { useStateValue } from "../store/StateProvider";
import Loading from "./animations/Loading";
import Footer from "./Footer";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));

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

  const LoginBackground = styled(Grid)({
    backgroundImage:
      "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
  });

  return (
    <Suspense fallback={<Loading title="Loading App.." />}>
      <LoginBackground
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        {!user ? <Login /> : <Home />}
      </LoginBackground>
      <Footer />
    </Suspense>
  );
}
