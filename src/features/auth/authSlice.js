import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.logging = true;
    },

    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },

    loginFailed(state, action) {
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
