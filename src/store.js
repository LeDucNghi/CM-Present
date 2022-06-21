// import {

// } from "@reduxjs/toolkit";

import appReducer from "features/slice";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";
import { userApi } from "services/userServices";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
