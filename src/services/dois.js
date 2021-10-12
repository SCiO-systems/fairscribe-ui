/* eslint-disable import/prefer-default-export */
import apiClient from '../utilities/api-client';

export const validateDoi = async (doi, title) =>
  apiClient.post(`/integrations/doi`, { doi, title });
