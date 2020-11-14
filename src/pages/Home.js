import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Loading from "../components/animations/Loading";

const Chat = lazy(() => import("../components/Chat"));
const Sidebar = lazy(() => import("../components/Sidebar"));

export default function Home() {
  const AppBody = styled(Box)({
    display: "flex",
    backgroundColor: "#ededed",
    marginTop: " -30px",
    height: "90vh",
    width: "90vw",
    boxShadow: "-1px 4px 20px -6px rgba(0, 0, 0, 0.5)",
  });
  return (
    <Suspense fallback={<Loading />}>
      <AppBody>
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Suspense fallback={<Loading />}>
                <Chat />
              </Suspense>
            </Route>
            <Route path="/"></Route>
          </Switch>
        </Router>
      </AppBody>
    </Suspense>
  );
}
