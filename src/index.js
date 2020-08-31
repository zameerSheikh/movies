import React from "react";
import ReactDOM from "react-dom";

import MovieContextProvider from "./movieContextProvider";
import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </React.StrictMode>,
  rootElement
);
