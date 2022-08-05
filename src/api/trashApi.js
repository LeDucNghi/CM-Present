import axiosClient from "./axiosClient";

export const trashApi = {
  getDeletedList: () => {
    const url = `trash`;
    return axiosClient.get(url);
  },

  deleteUser: (id) => {
    const url = `trash/${id}`;
    return axiosClient.delete(url);
  },
};
