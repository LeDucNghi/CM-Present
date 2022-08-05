import { history, rootReducer } from "./rootReducer";
import rootSaga, { sagaMiddleware } from "./rootSaga";

import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "services/userServices";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sagaMiddleware,
      userApi.middleware,
      routerMiddleware(history)
    ),
});

sagaMiddleware.run(rootSaga);

setupListeners(store.dispatch);
