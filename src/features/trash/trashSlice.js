import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trashList: [],
  deletedUserList: [],
};

export const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
    restoreUser: (state, action) => {
      state.userList.push({ ...action.payload, id: state.userList.length + 1 });
    },

    postDeletedList: (state, action) => {
      state.deletedUserList = action.payload;
    },

    deleteUser: (state, action) => {
      state.deletedUserList.push({
        ...action.payload,
        id: state.deletedUserList.length + 1,
      });
    },
  },
});

export const trashActions = trashSlice.actions;

export const selectTrashList = (state) => state.trash.trashList;
export const selectDeletedList = (state) => state.trash.deletedUserList;

export const trashReducer = trashSlice.reducer;
