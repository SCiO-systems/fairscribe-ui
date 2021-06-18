import apiClient from '../utilities/api-client';
import { getCsrfCookie } from './common';

// eslint-disable-next-line
export const login = async (email, password) => {
  await getCsrfCookie();
  const response = await apiClient.post('/api/v1/login', { email, password });
  return response.data.data;
};
