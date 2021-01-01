import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles/index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./styles/GlobalStyles";
import { ThemeProvider } from "@material-ui/core/styles";
import { StateProvider } from "./store/StateProvider";
import reducer, { initialState } from "./store/reducer";
import * as serviceWorker from "./service-worker";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StateProvider>,
  document.getElementById("root")
);

serviceWorker.register();
