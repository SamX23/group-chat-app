import React, { useEffect } from "react";
import { auth, persist } from "../firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Login from "./Login";
import Sidebar from "../components/Sidebar";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.setPersistence(persist);

    const listener = auth.onAuthStateChanged((authUser) => {
      console.log(auth.currentUser.providerData);
      dispatch({
        type: actionTypes.SET_USER,
        user: auth.currentUser.providerData[0],
      });
    });

    return function () {
      listener();
    };
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />

            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/"></Route>
            </Switch>
          </Router>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
