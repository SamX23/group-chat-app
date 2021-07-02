import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Footer";
import Layout from "./Layout";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}
