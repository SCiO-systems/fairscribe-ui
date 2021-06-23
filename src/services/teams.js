import apiClient from '../utilities/api-client';

export const getAllOwnedTeams = async (userId) =>
  apiClient.get(`/users/${userId}/teams/all`);

export const getOwnedTeams = async (userId, page = 1) =>
  apiClient.get(`/users/${userId}/teams?page=${page}`);

export const getAllSharedTeams = async () => apiClient.get(`/teams/all`);

export const getSharedTeams = async (page = 1) =>
  apiClient.get(`/teams?page=${page}`);

export const createTeam = async (userId, data) =>
  apiClient.post(`/users/${userId}/teams`, { ...data });

export const updateTeam = async (userId, teamId, data) =>
  apiClient.put(`/users/${userId}/teams/${teamId}`, { ...data });
