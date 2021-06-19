import apiClient from '../utilities/api-client';

export const getOwnedTeams = async (userId) =>
  apiClient.get(`/api/v1/users/${userId}/teams`);

export const getSharedTeams = async () => apiClient.get(`/api/v1/teams`);
