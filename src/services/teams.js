import apiClient from '../utilities/api-client';

export const getOwnedTeams = async (userId, page = 1) =>
  apiClient.get(`/api/v1/users/${userId}/teams?page=${page}`);

export const getSharedTeams = async () => apiClient.get(`/api/v1/teams/all`);
