import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { StateProvider } from "./store/StateProvider";
import reducer, { initialState } from "./store/reducer";

const App = lazy(() => import("./components/App"));

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <Suspense fallback={<div>Loading App...</div>}>
      <App />
    </Suspense>
  </StateProvider>,
  document.getElementById("root")
);
