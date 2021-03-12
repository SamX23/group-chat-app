import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "../pages/Navigation";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Navigation />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
