import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trashList: [],
  deletedUserList: [],
  loading: false,
  message: "",
  isError: false,
};

export const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
    removeToTrash: (state, action) => {
      state.loading = true;
    },

    restoreUser: (state, action) => {
      state.loading = true;
    },

    fetchingDeletedList: (state, action) => {
      state.loading = true;
    },

    fetchDeletedListSuccess: (state, action) => {
      state.deletedUserList = action.payload;
      state.loading = false;
      state.isError = false;
    },

    fetchDeletedListFailed: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isError = true;
    },

    deleteUser: (state, action) => {
      state.loading = true;
    },

    setTabs: (state, action) => {
      state.tabs = action.payload;
    },
  },
});

export const {
  restoreUser,
  removeToTrash,
  fetchingDeletedList,
  fetchDeletedListFailed,
  fetchDeletedListSuccess,
  deleteUser,
  setTabs,
} = trashSlice.actions;

// export const selectTrashList = (state) => state.trash.trashList;
export const selectDeletedList = (state) => state.trash.deletedUserList;
export const selectIsLoading = (state) => state.trash.loading;
export const selectMessage = (state) => state.trash.message;
export const selectTabs = (state) => state.trash.tabs;

export const trashReducer = trashSlice.reducer;
