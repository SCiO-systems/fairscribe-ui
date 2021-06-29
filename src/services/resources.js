import apiClient from '../utilities/api-client';

// eslint-disable-next-line
export const getResourceTypes = async () => apiClient.get(`/resource_types`);
