import apiClient from '../utilities/api-client';

export const getResourceTypes = async () => import('../data/resourcetypes/types.json');

export const getResourceFiles = async (teamId, resourceId) =>
  apiClient.get(`/teams/${teamId}/resources/${resourceId}/files`);

export const uploadFile = async (teamId, resourceId, data) =>
  apiClient.post(`/teams/${teamId}/resources/${resourceId}/files`, data, {
    'Content-Type': 'multipart/form-data',
  });

export const getThumbnailURL = async (teamId, resourceId, thumbId) =>
  apiClient.get(`/teams/${teamId}/resources/${resourceId}/thumbnails/${thumbId}`);

export const updateResource = async (teamId, resourceId, data) =>
  apiClient.put(`/teams/${teamId}/resources/${resourceId}`, data);

export const updateResourceComments = async (teamId, resourceId, data) =>
  apiClient.put(`/teams/${teamId}/resources/${resourceId}/comments`, data);

export const deleteFile = async (teamId, resourceId, id) =>
  apiClient.remove(`/teams/${teamId}/resources/${resourceId}/files/${id}`);

export const uploadThumbnail = async (teamId, resourceId, data) =>
  apiClient.post(`/teams/${teamId}/resources/${resourceId}/thumbnails`, data, {
    'Content-Type': 'multipart/form-data',
  });

export const deleteThumbnail = async (teamId, resourceId, id) =>
  apiClient.remove(`/teams/${teamId}/resources/${resourceId}/thumbnails/${id}`);

export const deleteTeamResource = async (teamId, resourceId) =>
  apiClient.remove(`/teams/${teamId}/resources/${resourceId}`);

export const calculateFairScore = async (teamId, resourceId) =>
  apiClient.post(`teams/${teamId}/resources/${resourceId}/fairscore`);
