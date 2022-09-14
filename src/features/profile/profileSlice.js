import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
  file: null,
  loading: false,
  userProfile: null,
  message: "",
  error: false,
  isFetching: false,
  id: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },

    updateUser: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state) => {
      state.loading = false;
    },

    fetchingUser: (state) => {
      state.isFetching = true;
    },

    fetchUserByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.userProfile = action.payload;
    },

    fetchUserByIdFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },

    updateUserFailed: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    },
  },
});

export const {
  setImage,
  setNewImage,
  updateUser,
  updateUserSuccess,
  fetchingUser,
  fetchUserByIdSuccess,
  fetchUserByIdFailed,
  updateUserFailed,
} = profileSlice.actions;

export const selectImage = (state) => state.profile.image;
export const selectLoading = (state) => state.profile.loading;
export const selectFetching = (state) => state.profile.isFetching;
export const selectUserProfile = (state) => state.profile.userProfile;
export const selectMessage = (state) => state.profile.message;
export const selectError = (state) => state.profile.error;

export const profileReducer = profileSlice.reducer;
