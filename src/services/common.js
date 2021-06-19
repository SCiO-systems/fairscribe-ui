import apiClient from '../utilities/api-client';

// eslint-disable-next-line
export const getCsrfCookie = async () => apiClient.get('/sanctum/csrf-cookie');
