import apiClient from '../utilities/api-client';

export const getTeamCollections = async (teamId, page = 1) =>
  apiClient.get(`/teams/${teamId}/collections?page=${page}`);

export const getSingleTeamCollection = async (teamId, collectionId) =>
  apiClient.get(`/teams/${teamId}/collections/${collectionId}`);

export const createTeamCollection = async (teamId, data) =>
  apiClient.post(`/teams/${teamId}/collections/`, data);

export const updateTeamCollection = async (teamId, collectionId, data) =>
  apiClient.put(`/teams/${teamId}/collections/${collectionId}`, data);
