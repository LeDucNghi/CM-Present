import appReducer from "features/slice";
import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { trashReducer } from "features/trash/trashSlice";
import { userApi } from "services/userServices";
import { userReducer } from "features/user/userSlice";

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  trash: trashReducer,
  router: connectRouter(history),
  [userApi.reducerPath]: userApi.reducer,
});
