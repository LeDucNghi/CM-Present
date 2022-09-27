import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trashList: [],
  deletedUserList: [],
  loading: false,
  message: "",
  isError: false,
  isConfirmed: false,
  isDeny: false,
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

    setConfirm: (state) => {
      state.isConfirmed = true;
    },

    setDenied: (state) => {
      state.isDeny = true;
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
  setConfirm,
  setDenied,
} = trashSlice.actions;

// export const selectTrashList = (state) => state.trash.trashList;
export const selectDeletedList = (state) => state.trash.deletedUserList;
export const selectIsLoading = (state) => state.trash.loading;
export const selectMessage = (state) => state.trash.message;
export const selectTabs = (state) => state.trash.tabs;
export const selectConfirmed = (state) => state.trash.isConfirmed;
export const selectDenied = (state) => state.trash.isDeny;

export const trashReducer = trashSlice.reducer;
