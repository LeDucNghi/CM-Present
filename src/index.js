import "./index.css";

import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import ErrorBoundary from "app/errorBoundary";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import history from "utils/history";
import reportWebVitals from "./reportWebVitals";
import { store } from "app/store";

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
