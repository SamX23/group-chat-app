import ReactDOM from "react-dom";
import "./styles/index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StateProvider } from "./store/StateProvider";
import App from "./components/App";
import reducer, { initialState } from "./store/reducer";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <CssBaseline />
    <App />
  </StateProvider>,
  document.getElementById("root")
);
