import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ErrorBoundary from "app/errorBoundary";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import history from "utils/history";
import reportWebVitals from "./reportWebVitals";
import { store } from "app/store";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <HistoryRouter history={history}>
        <CssBaseline />
        <App />
      </HistoryRouter>
    </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
