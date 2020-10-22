import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Chat = lazy(() => import("../components/Chat"));
const Sidebar = lazy(() => import("../components/Sidebar"));

export default function Home() {
  return (
    <Suspense fallback={<div>Loading Home...</div>}>
      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Suspense fallback={<div>Loading Chat...</div>}>
                <Chat />
              </Suspense>
            </Route>
            <Route path="/"></Route>
          </Switch>
        </Router>
      </div>
    </Suspense>
  );
}
