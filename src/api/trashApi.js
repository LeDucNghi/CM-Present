import axiosClient from "./axiosClient";

export const trashApi = {
  addNewUser: (data) => {
    const url = `trash`;
    return axiosClient.post(url, data);
  },

  getDeletedList: () => {
    const url = `trash`;
    return axiosClient.get(url);
  },

  deleteUser: (id) => {
    console.log("🚀 ~ file: trashApi.js ~ line 15 ~ id", id);
    const url = `trash/${id}`;
    return axiosClient.delete(url);
  },
};
