import axios from 'axios';

const singleton = Symbol('API Singleton');
const singletonEnforcer = Symbol('API Singleton Enforcer');

class ApiClient {
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
      withCredentials: true,
    });
  }

  static get instance() {
    // Try to get an efficient singleton
    if (!this[singleton]) {
      this[singleton] = new ApiClient(singletonEnforcer);
    }

    return this[singleton];
  }

  get = (...params) => this.session.get(...params);

  post = (...params) => this.session.post(...params);

  put = (...params) => this.session.put(...params);

  patch = (...params) => this.session.patch(...params);

  remove = (...params) => this.session.delete(...params);
}

export const setupMiddleware = (rejectionCb) => {
  ApiClient.instance.session.interceptors.response.use(
    (response) => (response.status !== 204 ? response.data.data : response),
    (err) => {
      rejectionCb(err);
      throw err;
    },
  );
};

export default ApiClient.instance;
