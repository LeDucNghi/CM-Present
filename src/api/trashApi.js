import axiosClient from "./axiosClient";

export const trashApi = {
  getDeletedList: () => {
    const url = `trash`;
    return axiosClient.get(url);
  },

  deleteUser: (id) => {
    console.log("🚀 ~ file: trashApi.js ~ line 10 ~ id", id);
    const url = `trash/${id}`;
    return axiosClient.delete(url);
  },
};
