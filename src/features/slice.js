import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    routeName: "Users",
    userInfo: null,
    mode: "light",
    language: "",
    userList: [],
    trashList: [],
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

    postTrashList: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 48 ~ action.payload",
        action.payload
      );
      state.trashList.push(action.payload);
    },

    postUserList: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 53 ~ action.payload",
        action.payload
      );
      state.userList.push(action.payload);
    },
  },
});

export const {
  routesName,
  postUserInfo,
  postMode,
  postLanguage,
  postTrashList,
  postUserList,
} = appSlice.actions;

export default appSlice.reducer;
