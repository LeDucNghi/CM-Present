import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  message: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postUserList: (state) => {
      state.loading = true;
      //   state.userList = action.payload;
    },

    postUserListSuccess: (state, action) => {
      state.loading = "idle";
      state.userList = action.payload;
      console.log(
        "🚀 ~ file: userSlice.js ~ line 21 ~ action.payload",
        action.payload
      );
    },

    postUserListFailed: (state, action) => {
      state.message = action.payload;
    },

    addUser: (state, action) => {
      state.userList.push({
        ...action.payload,
        id: state.userList.length + 1,
      });
    },
  },
});

export const userActions = userSlice.actions;
// {
//   postUserList,
//   addUser,
//   postUserListFailed,
//   postUserListSuccess,
// }

export const selectUserList = (state) => state.user.userList;
export const selectAddUser = (state) => state.user.addUser;
export const selectGetUserListFailed = (state) => state.user.postUserListFailed;

export const userReducer = userSlice.reducer;
