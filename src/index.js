import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles/index.css";
import { StateProvider } from "./store/StateProvider";
import reducer, { initialState } from "./store/reducer";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
