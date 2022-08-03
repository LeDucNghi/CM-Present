import appReducer from "features/slice";
import { combineReducers } from "@reduxjs/toolkit";
import { userApi } from "services/userServices";

export const rootReducer = combineReducers({
  app: appReducer,
  [userApi.reducerPath]: userApi.reducer,
});
