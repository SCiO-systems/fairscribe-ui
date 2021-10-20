import apiClient from '../utilities/api-client';

export const listLanguages = async () => apiClient.get(`/integrations/languages`);

export const getMimetype = async (filename) =>
  apiClient.post(`/integrations/mimetypes`, { filename, type: 'dataset' });

export const listVocabularies = async () => apiClient.get(`/integrations/vocabularies`);

export const autocompleteTerm = async (index, term) =>
  apiClient.get(`/integrations/vocabularies/autocomplete?index=${index}&term=${term}`);

export const extractKeywords = async (text) =>
  apiClient.post(`/integrations/vocabularies/terms/extract`, { text });
