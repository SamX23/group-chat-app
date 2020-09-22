import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Chat from "./Chat";
import Footer from "./Footer";
import Login from "./Login";
import Sidebar from "./Sidebar";

function App() {
  // eslint-disable-next-line 
  const [{ user }, dispatch] = useStateValue();

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
