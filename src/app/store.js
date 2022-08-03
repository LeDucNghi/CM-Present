import rootSaga, { sagaMiddleware } from "./rootSaga";

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "services/userServices";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, userApi.middleware),
});

sagaMiddleware.run(rootSaga);

setupListeners(store.dispatch);
