import { createSlice, current } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    routeName: "Users",
    userInfo: null,
    mode: "light",
    language: "",
    userList: [],
    deletedUserList: [],
    trashList: [],
    restoreList: [],
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

    postUserList: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 53 ~ action.payload",
        action.payload
      );
      state.userList = action.payload;
      console.log(
        "🚀 ~ file: slice.js ~ line 52 ~ state.userList",
        state.userList
      );
    },

    restoreUser: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 63 ~ action.payload",
        action.payload
      );
      state.userList.push({ ...action.payload, id: state.userList.length + 1 });
      console.log(
        "🚀 ~ file: slice.js ~ line 52 ~ state.userList",
        state.userList
      );
    },

    postDeletedList: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 53 ~ postDeletedList",
        action.payload
      );
      state.deletedUserList = action.payload;
      console.log(
        "🚀 ~ file: slice.js ~ line 80 ~ state.deletedUserList",
        state.deletedUserList
      );
    },

    deleteUser: (state, action) => {
      state.deletedUserList.push({
        ...action.payload,
        id: state.deletedUserList.length + 1,
      });

      console.log(
        "🚀 ~ file: slice.js ~ line 77 ~ state.trashList",
        current(state.deletedUserList)
      );
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
} = appSlice.actions;

export default appSlice.reducer;
