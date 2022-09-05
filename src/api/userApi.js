import axiosClient from "./axiosClient";

export const userApi = {
  getAll: () => {
    const url = `users`;
    return axiosClient.get(url);
  },

  getUserTeam: (team) => {
    console.log("🚀 ~ file: userApi.js ~ line 10 ~ team", team);
    const url = `users?team=${team}`;
    return axiosClient.get(url);
  },

  getUserById: (userId) => {
    console.log("🚀 ~ file: userApi.js ~ line 16 ~ userId", userId);
    const url = `users/${userId}`;

    return axiosClient.get(url);
  },

  addNewUser: (data) => {
    console.log("🚀 ~ file: userApi.js ~ line 22 ~ data", data);
    const url = `users`;
    return axiosClient.post(url, data);
  },

  updateUser: (data) => {
    const url = `users/${data.id}`;
    return axiosClient.put(url, data);
  },

  deleteUser: (id) => {
    console.log("🚀 ~ file: userApi.js ~ line 34 ~ id", id);

    const url = `users/${id}`;
    return axiosClient.delete(url);
  },
};
