import apiClient from '../utilities/api-client';

export const getUserProfile = async (id) => apiClient.get(`/users/${id}`);
export const getUserRepositories = async (id) =>
  apiClient.get(`/users/${id}/repositories/all`);
export const getUserAvatar = async (id) => apiClient.get(`/users/${id}/avatar`);
export const updateUserAvatar = async (id, data) =>
  apiClient.post(`/users/${id}/avatar`, data, {
    'Content-Type': 'multipart/form-data',
  });
export const createUserRepository = async (id, data) =>
  apiClient.post(`/users/${id}/repositories`, data);
export const deleteUserRepository = async (repositoryId, userId) => {
  apiClient.remove(`/users/${userId}/repositories/${repositoryId}`);
};
