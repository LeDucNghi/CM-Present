import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  message: "",
  loading: false,
  success: false,
  isOpen: Boolean,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchingUserList: (state) => {
      state.loading = true;
    },

    fetchUserListSuccess: (state, action) => {
      state.loading = false;
      state.userList = action.payload;
      state.success = true;
    },

    fetchUserListFailed: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },

    addUser: (state, action) => {
      state.loading = true;
    },

    addUserSuccess: (state, action) => {
      state.userList.push({
        ...action.payload,
        id: state.userList[state.userList.length - 1].id + 1,
      });
      state.loading = false;
      state.isOpen = false;
    },

    addUserFailed: (state, action) => {
      state.loading = false;
      state.isOpen = false;
    },

    deleteFromUserList: (state) => {
      state.loading = true;
    },

    setOpenModal: (state) => {
      state.isOpen = true;
    },
  },
});

export const {
  fetchingUserList,
  addUser,
  addUserSuccess,
  addUserFailed,
  fetchUserListFailed,
  fetchUserListSuccess,
  deleteFromUserList,
  setOpenModal,
} = userSlice.actions;

export const selectUserList = (state) => state.user.userList;
export const selectMessage = (state) => state.user.message;
export const selectIsLoading = (state) => state.user.loading;
export const selectSuccess = (state) => state.user.success;
export const selectOpen = (state) => state.user.isOpen;

export const userReducer = userSlice.reducer;
