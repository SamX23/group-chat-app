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
    backgroundColor: "#ededed",
    height: "90vh",
    boxShadow: "-1px 4px 20px -6px rgba(0, 0, 0, 0.8)",
  });

  return (
    <Router>
      <AppBody>
        <Suspense fallback={<Loading title="Loading Navigation.." />}>
          <Sidebar />
          <Switch>
            <Suspense fallback={<Loading title="Loading Room Body.." />}>
              <Route path="/rooms/:roomId" component={Room} />
            </Suspense>
          </Switch>
        </Suspense>
      </AppBody>
    </Router>
  );
}
