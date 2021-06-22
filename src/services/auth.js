import apiClient from '../utilities/api-client';

export const login = async (email, password) =>
  apiClient.post('/login', { email, password });

export const logout = async () => apiClient.post('/logout');

export const getUser = async () => apiClient.get('/auth/token/check');
