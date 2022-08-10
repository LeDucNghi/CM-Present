import authReducer from "features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { drawerReducer } from "features/drawer/drawerSlice";
import history from "utils/history";
import { trashReducer } from "features/trash/trashSlice";
import { userApi } from "services/userServices";
import { userReducer } from "features/user/userSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  trash: trashReducer,
  drawer: drawerReducer,
  router: connectRouter(history),
  [userApi.reducerPath]: userApi.reducer,
});
