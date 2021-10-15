import apiClient from '../utilities/api-client';

export const listLanguages = async () => apiClient.get(`/integrations/languages`);

export const getMimetype = async (filename) =>
  apiClient.post(`/integrations/mimetypes`, { filename, type: 'dataset' });

export const listVocabularies = async () => apiClient.get(`/integrations/vocabularies`);
