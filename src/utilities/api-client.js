import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export function setup(axiosInstance, cb, token) {
  axiosInstance.interceptors.response.use(
    (response) => (response.data ? response.data : response),
    (error) => {
      if (error.response.status === 401) {
        cb();
      }
    },
  );

  axiosInstance.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${token}`; //eslint-disable-line
    return config;
  });
}

export default instance;
