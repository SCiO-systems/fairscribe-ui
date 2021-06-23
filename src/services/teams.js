import apiClient from '../utilities/api-client';

export const getOwnedTeams = async (userId, page = 1) =>
  apiClient.get(`/users/${userId}/teams?page=${page}`);

export const getSharedTeams = async () => apiClient.get(`/teams/all`);

export const createTeam = async (userId, data) =>
  apiClient.post(`/users/${userId}/teams`, { ...data });

export const updateTeam = async (userId, teamId, data) =>
  apiClient.put(`/users/${userId}/teams/${teamId}`, { ...data });
