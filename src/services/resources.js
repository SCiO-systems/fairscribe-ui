import apiClient from '../utilities/api-client';

export const getResourceTypes = async () => apiClient.get(`/resource_types`);

export const getResourceFiles = async (teamId, resourceId) =>
  apiClient.get(`/teams/${teamId}/resources/${resourceId}/files`);

export const uploadFile = async (teamId, resourceId, data) =>
  apiClient.post(`/teams/${teamId}/resources/${resourceId}/files`, data, {
    'Content-Type': 'multipart/form-data',
  });

export const deleteFile = async (teamId, resourceId, id) =>
  apiClient.remove(`/teams/${teamId}/resources/${resourceId}/files/${id}`);

export const uploadThumbnail = async (teamId, resourceId, data) =>
  apiClient.post(`/teams/${teamId}/resources/${resourceId}/thumbnails`, data, {
    'Content-Type': 'multipart/form-data',
  });

export const deleteThumbnail = async (teamId, resourceId, id) =>
  apiClient.remove(`/teams/${teamId}/resources/${resourceId}/thumbnails/${id}`);
