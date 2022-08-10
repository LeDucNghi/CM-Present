import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routeName: "Users",
  mode: "light",
  language: "Eng",
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    routesName: (state, action) => {
      state.routeName = action.payload;
    },

    postMode: (state, action) => {
      state.mode = action.payload;
    },

    postLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { routesName, postMode, postLanguage } = drawerSlice.actions;

export const selectMode = (state) => state.drawer.mode;
export const selectRoutesName = (state) => state.drawer.routeName;
export const selectLanguage = (state) => state.drawer.language;

export const drawerReducer = drawerSlice.reducer;
