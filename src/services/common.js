import apiClient from '../utilities/api-client';

// eslint-disable-next-line
export const getCsrfCookie = async () => {
  await apiClient.get('/sanctum/csrf-cookie');
};
