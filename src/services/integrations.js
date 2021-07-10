import apiClient from '../utilities/api-client';

export const searchGrid = async (term) =>
  apiClient.get(`/integrations/grid?search=${term}`);

export const searchAgroVoc = async (term) =>
  apiClient.get(`/integrations/agrovok?search=${term}`);
