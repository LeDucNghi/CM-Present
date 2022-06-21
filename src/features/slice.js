import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    routeName: "Users",
    userInfo: null,
    mode: "light",
    language: "",
  },
  reducers: {
    routesName: (state, action) => {
      console.log(
        "🚀 ~ file: usersSlice.js ~ line 11 ~ action.payload",
        action.payload
      );
      state.routeName = action.payload;
    },

    postUserInfo: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 20 ~ action.payload",
        action.payload
      );
      state.userInfo = action.payload;
    },

    postMode: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 29 ~ action.payload",
        action.payload
      );
      state.mode = action.payload;
    },

    postLanguage: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 39 ~ action.payload",
        action.payload
      );
      state.language = action.payload;
    },
  },
});

export const { routesName, postUserInfo, postMode, postLanguage } =
  appSlice.actions;

export default appSlice.reducer;
