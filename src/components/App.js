import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./animations/Loading";
import Footer from "./Footer";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading title="Loading App.." />}>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Suspense>
    </Router>
  );
}
