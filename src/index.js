import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles/index.css";
import { StateProvider } from "./store/StateProvider";
import reducer, { initialState } from "./store/reducer";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <CssBaseline />
    <App />
  </StateProvider>,
  document.getElementById("root")
);
