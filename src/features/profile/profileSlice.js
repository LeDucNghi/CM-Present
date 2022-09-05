import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setImage } = profileSlice.actions;

export const selectImage = (state) => state.profile.image;

export const profileReducer = profileSlice.reducer;
