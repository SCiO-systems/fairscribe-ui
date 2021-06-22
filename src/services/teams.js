import apiClient from '../utilities/api-client';

export const getOwnedTeams = async (userId, page = 1) =>
  apiClient.get(`/users/${userId}/teams?page=${page}`);

export const getSharedTeams = async () => apiClient.get(`/teams/all`);
