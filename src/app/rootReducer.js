import authReducer from "features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { drawerReducer } from "features/drawer/drawerSlice";
import { profileReducer } from "features/profile/profileSlice";
import { trashReducer } from "features/trash/trashSlice";
import { userApi } from "services/userServices";
import { userReducer } from "features/user/userSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  trash: trashReducer,
  drawer: drawerReducer,
  profile: profileReducer,
  [userApi.reducerPath]: userApi.reducer,
});
