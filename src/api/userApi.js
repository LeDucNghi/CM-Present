import axiosClient from "./axiosClient";

export const userApi = {
  getAll: () => {
    const url = `users`;
    return axiosClient.get(url);
  },

  getUserTeam: (team) => {
    const url = `users?team=${team}`;
    return axiosClient.get(url);
  },

  getUserById: (userId) => {
    const url = `users/${userId}`;
    return axiosClient.get(url);
  },

  addNewUser: (data) => {
    const url = `users`;
    return axiosClient.post(url, data);
  },

  updateUser: (data) => {
    const url = `users/${data.id}`;
    return axiosClient.put(url, data.values);
  },

  deleteUser: (id) => {
    const url = `users/${id}`;
    return axiosClient.delete(url);
  },
};
