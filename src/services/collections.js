import apiClient from '../utilities/api-client';

export const getTeamCollections = async (teamId) =>
  apiClient.get(`/teams/${teamId}/collections`);

export const getSingleTeamCollection = async (teamId, collectionId) =>
  apiClient.get(`/teams/${teamId}/collections/${collectionId}`);

export const createTeamCollection = async (teamId, data) =>
  apiClient.post(`/teams/${teamId}/collections/`, data);

export const updateTeamCollection = async (teamId, data) =>
  apiClient.put(`/teams/${teamId}/collections/`, data);
