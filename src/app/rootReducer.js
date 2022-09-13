import authReducer from "features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { drawerReducer } from "features/drawer/drawerSlice";
import { profileReducer } from "features/profile/profileSlice";
import { trashReducer } from "features/trash/trashSlice";
import { userReducer } from "features/user/userSlice";

export const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  trash: trashReducer,
  drawer: drawerReducer,
  profile: profileReducer,
});
