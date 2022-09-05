import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trashList: [],
  deletedUserList: [],
  loading: false,
  message: "",
};

export const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
    restoreUser: (state, action) => {
      state.loading = true;
      // state.userList.push({ ...action.payload, id: state.userList.length + 1 });
    },

    postDeletedList: (state, action) => {
      state.loading = true;
    },

    postDeletedListSuccess: (state, action) => {
      state.deletedUserList = action.payload;
      state.loading = false;
    },

    postDeletedListFailed: (state, action) => {
      state.loading = false;
      state.message = action.payload;
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
  postDeletedList,
  postDeletedListFailed,
  postDeletedListSuccess,
  deleteUser,
  setTabs,
} = trashSlice.actions;

// export const selectTrashList = (state) => state.trash.trashList;
export const selectDeletedList = (state) => state.trash.deletedUserList;
export const selectIsLoading = (state) => state.trash.loading;
export const selectMessage = (state) => state.trash.message;
export const selectTabs = (state) => state.trash.tabs;

export const trashReducer = trashSlice.reducer;
