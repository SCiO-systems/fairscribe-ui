import apiClient from '../utilities/api-client';

export const searchGrid = async (term) => apiClient.get(`/integrations/grid?search=${term}`);

export const searchAgroVoc = async (term) => apiClient.get(`/integrations/agrovok?search=${term}`);

export const listLanguages = async () => apiClient.get(`/integrations/languages`);

export const getMimetype = async (filename) =>
  apiClient.post(`/integrations/mimetypes`, { filename, type: 'dataset' });
