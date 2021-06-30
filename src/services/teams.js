import apiClient from '../utilities/api-client';

export const getAllOwnedTeams = async (userId) =>
  apiClient.get(`/users/${userId}/teams/all`);

export const getOwnedTeams = async (userId, page = 1) =>
  apiClient.get(`/users/${userId}/teams?page=${page}`);

export const getAllSharedTeams = async () => apiClient.get(`/teams/all`);

export const getSharedTeams = async (page = 1) =>
  apiClient.get(`/teams?page=${page}`);

export const getSingleTeam = async (teamId) =>
  apiClient.get(`/teams/${teamId}`);

export const createTeam = async (userId, data) =>
  apiClient.post(`/users/${userId}/teams`, { ...data });

export const updateTeam = async (userId, teamId, data) =>
  apiClient.put(`/users/${userId}/teams/${teamId}`, { ...data });

export const inviteEmails = async (teamId, emails) =>
  apiClient.post(`/teams/${teamId}/invite`, { emails });

export const getAllCollections = async (teamId) =>
  apiClient.get(`/teams/${teamId}/collections/all`);

export const getResources = async (teamId, status = 'published', page = 1) =>
  apiClient.get(`/teams/${teamId}/resources?status=${status}&page=${page}`);

export const getSingleResource = async (teamId, resourceId) =>
  apiClient.get(`/teams/${teamId}/resources/${resourceId}`);

export const createResource = async (teamId, data) =>
  apiClient.post(`/teams/${teamId}/resources`, { ...data });
