import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      // sagaMiddleware,
      thunk
    ),
});

// sagaMiddleware.run(rootSaga);

setupListeners(store.dispatch);
