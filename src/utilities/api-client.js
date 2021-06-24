/* eslint-disable no-console */
import axios from 'axios';

const singleton = Symbol('API Singleton');
const singletonEnforcer = Symbol('API Singleton Enforcer');

class ApiClient {
  isInitialised = false;

  requestInterceptors = [];

  responseInterceptors = [];

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    // eslint-disable-next-line
    console.log(
      `Initialized API client for: ${process.env.REACT_APP_API_BASE_URL}`,
    );

    this.session = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  static get instance() {
    // Try to get an efficient singleton
    if (!this[singleton]) {
      this[singleton] = new ApiClient(singletonEnforcer);
    }

    return this[singleton];
  }

  setup = (cb, token) => {
    if (this.isInitialised) return;

    console.log(`Setting up API client interceptors.`);
    this.responseInterceptors.push(
      this.session.interceptors.response.use(
        (response) => (response.data ? response.data : response),
        (error) => {
          if (error && error.response && error.response.status === 401) {
            return cb();
          }
          return Promise.reject(error);
        },
      ),
    );

    this.requestInterceptors.push(
      this.session.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`; //eslint-disable-line
        return config;
      }),
    );

    this.isInitialised = true;
  };

  resetInterceptors = () => {
    console.log(`Resetting API client interceptors.`);
    this.requestInterceptors.forEach((i) => {
      this.session.interceptors.request.eject(i);
    });

    this.responseInterceptors.forEach((i) => {
      this.session.interceptors.response.eject(i);
    });

    this.isInitialised = false;
  };

  get = (...params) => this.session.get(...params);

  post = (...params) => this.session.post(...params);

  put = (...params) => this.session.put(...params);

  patch = (...params) => this.session.patch(...params);

  remove = (...params) => this.session.delete(...params);
}

export default ApiClient.instance;
