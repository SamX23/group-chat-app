import ReactDOM from "react-dom";
import "./styles/index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styles/GlobalStyles";
import { StateProvider } from "./store/StateProvider";
import App from "./components/App";
import reducer, { initialState } from "./store/reducer";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StateProvider>,
  document.getElementById("root")
);
