import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Loading from "../components/animations/Loading";

const Room = lazy(() => import("../components/room/Room"));
const Sidebar = lazy(() => import("../components/sidebar/Sidebar"));

export default function App() {
  const AppBody = styled(Box)({
    display: "flex",
    backgroundColor: "#d8e3e7",
    height: "90vh",
    boxShadow: "-1px 4px 20px -6px #d8e3e7",
  });

  return (
    <Router>
      <AppBody>
        <Suspense fallback={<Loading title="Loading App Pages" />}>
          <Sidebar />
          <Switch>
            <Suspense fallback={<Loading title="Loading Rooms" />}>
              <Route path="/rooms/:roomId" component={Room} />
            </Suspense>
          </Switch>
        </Suspense>
      </AppBody>
    </Router>
  );
}
