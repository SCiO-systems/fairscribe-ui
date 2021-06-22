import apiClient from '../utilities/api-client';

export const getMyInvites = async (userId) =>
  apiClient.get(`/users/${userId}/invites`);

export const acceptInvite = async (userId, invitationId) =>
  apiClient.post(`/users/${userId}/invites/${invitationId}/accept`);

export const rejectInvite = async (userId, invitationId) =>
  apiClient.post(`/users/${userId}/invites/${invitationId}/reject`);
