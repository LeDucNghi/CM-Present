import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    routeName: "Users",
  },
  reducers: {
    routesName: (state, action) => {
      console.log(
        "🚀 ~ file: usersSlice.js ~ line 11 ~ action.payload",
        action.payload
      );
      state.routeName = action.payload;
    },
  },
});

export const { routesName } = userSlice.actions;

export default userSlice.reducer;
