import apiClient from '../utilities/api-client';

export const getProfile = async (id) => apiClient.get(`/users/${id}`);
export const getRepositories = async (id) =>
  apiClient.get(`/users/${id}/repositories/all`);
export const getRepositoryTypes = async (id) =>
  apiClient.get(`/repository_types`);
export const getAvatar = async (id) => apiClient.get(`/users/${id}/avatar`);
export const updateAvatar = async (id, data) => apiClient.post(`/users/${id}/avatar`, data, {
  'Content-Type': 'multipart/form-data',
});
