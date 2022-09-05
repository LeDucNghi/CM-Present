import rootSaga, { sagaMiddleware } from "./rootSaga";

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";
import { userApi } from "services/userServices";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      // sagaMiddleware,
      userApi.middleware,
      thunk
    ),
});

// sagaMiddleware.run(rootSaga);

setupListeners(store.dispatch);
