import { createSlice, current } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    routeName: "Users",
    userInfo: null,
    mode: "light",
    language: "",
    userList: null,
    deletedUserList: [],
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

    postDeletedList: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 53 ~ postDeletedList",
        action.payload
      );

      // console.log("after", current(state.trashList));
      state.deletedUserList = action.payload;
      console.log(
        "🚀 ~ file: slice.js ~ line 80 ~ state.deletedUserList",
        state.deletedUserList
      );
    },

    postTrashList: (state, action) => {
      console.log(
        "🚀 ~ file: slice.js ~ line 78 ~ state.deletedUserList",
        current(state.deletedUserList)
      );
      console.log(
        "🚀 ~ file: slice.js ~ line 80 ~ action.payload",
        action.payload
      );

      // state.deletedUserList.forEach((element) => {
      //   console.log(
      //     "🚀 ~ file: slice.js ~ line 84 ~ element",
      //     current(element)
      //   );
      // });
      const lastIndex =
        state.deletedUserList[state.deletedUserList.length - 1].id;
      state.deletedUserList.push({ ...action.payload, id: lastIndex + 1 });

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
  postTrashList,
} = appSlice.actions;

export default appSlice.reducer;
