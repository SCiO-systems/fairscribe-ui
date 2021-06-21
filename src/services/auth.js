import apiClient from '../utilities/api-client';
import { getCsrfCookie } from './common';

export const login = async (email, password) => {
  await getCsrfCookie();
  return apiClient.post('/api/v1/login', { email, password });
};

export const logout = async () => apiClient.post('/api/v1/logout');

export const getUser = async () => apiClient.get('/api/v1/auth/user');
