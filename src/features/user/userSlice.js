import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  message: "",
  loading: false,
  success: false,
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
      state.loading = false;
      state.userList = action.payload;
      state.success = true;
    },

    postUserListFailed: (state, action) => {
      state.message = action.payload;
    },

    addUser: (state, action) => {
      state.loading = true;
      state.userList.push({
        ...action.payload,
        id: state.userList.length + 1,
      });
    },

    addUserSuccess: (state, action) => {
      state.loading = false;
    },

    deleteFromUserList: (state) => {
      state.loading = true;
    },
  },
});

export const {
  postUserList,
  addUser,
  addUserSuccess,
  postUserListFailed,
  postUserListSuccess,
  deleteFromUserList,
} = userSlice.actions;

export const selectUserList = (state) => state.user.userList;
export const selectMessage = (state) => state.user.message;
export const selectIsLoading = (state) => state.user.loading;
export const selectSuccess = (state) => state.user.success;

export const userReducer = userSlice.reducer;
