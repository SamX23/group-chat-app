import React, { useEffect } from "react";
import { auth, persist } from "../firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Login from "./Login";
import Sidebar from "../components/Sidebar";

function App() {
  const [{ user }] = useStateValue();

  useEffect(() => {
    auth.setPersistence(persist);
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
