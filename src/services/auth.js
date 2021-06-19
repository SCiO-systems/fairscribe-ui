import apiClient from '../utilities/api-client';
import { getCsrfCookie } from './common';

export const login = async (email, password) => {
  await getCsrfCookie();
  const response = await apiClient.post('/api/v1/login', { email, password });
  return response.data.data;
};

export const logout = async () => apiClient.post('/api/v1/logout');
