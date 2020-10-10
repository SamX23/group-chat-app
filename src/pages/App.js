import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Login from "./Login";
import Sidebar from "../components/Sidebar";

function App() {
  const [{ user }] = useStateValue();

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
