import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { StateProvider } from "./store/StateProvider";
import reducer, { initialState } from "./store/reducer";

import Loading from "./components/animations/Loading";

const App = lazy(() => import("./components/App"));

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StateProvider>,
  document.getElementById("root")
);
