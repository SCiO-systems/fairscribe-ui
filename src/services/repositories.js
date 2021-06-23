import apiClient from '../utilities/api-client';

const getRepositoryTypes = async (id) => apiClient.get(`/repository_types`);

export default getRepositoryTypes;
