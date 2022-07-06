import { createSlice, current } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    routeName: "Users",
    userInfo: null,
    mode: "light",
    language: "Eng",
    userList: [],
    deletedUserList: [],
    trashList: [],
    restoreList: [],
  },
  reducers: {
    routesName: (state, action) => {
      state.routeName = action.payload;
    },

    postUserInfo: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 22 ~ action.payload",
        action.payload
      );
      state.userInfo = action.payload;
      // console.log(
      //   "🚀 ~ file: slice.js ~ line 23 ~ state.userInfo",
      //   current(state.userInfo)
      // );
    },

    postMode: (state, action) => {
      state.mode = action.payload;
    },

    postLanguage: (state, action) => {
      state.language = action.payload;
    },

    postUserList: (state, action) => {
      state.userList = action.payload;
    },

    restoreUser: (state, action) => {
      state.userList.push({ ...action.payload, id: state.userList.length + 1 });
    },

    postDeletedList: (state, action) => {
      state.deletedUserList = action.payload;
    },

    deleteUser: (state, action) => {
      state.deletedUserList.push({
        ...action.payload,
        id: state.deletedUserList.length + 1,
      });
    },

    addUser: (state, action) => {
      state.userList.push({
        ...action.payload,
        id: state.userList.length + 1,
      });
    },
  },
});

export const {
  routesName,
  postUserInfo,
  postMode,
  postLanguage,
  postUserList,
  postDeletedList,
  deleteUser,
  restoreUser,
  addUser,
} = appSlice.actions;

export default appSlice.reducer;
