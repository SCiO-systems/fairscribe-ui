import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import axiosRetry from 'axios-retry';

export const BACKEND = process.env.REACT_APP_API_BASE_URL;

export const http = axios.create({
	timeout: process.env.REACT_APP_REQUEST_TIMEOUT * 1000,
	baseURL: `${BACKEND}`,
	// withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

axiosRetry(http, {
	retries: 3, // number of retries
	retryDelay: (retryCount) => {
		console.log(`retry attempt: ${retryCount}`);
		return retryCount * process.env.REACT_APP_REQUEST_TIMEOUT * 1000; // time interval between retries
	},
});

// http.interceptors.request.use(
// 	(config) => {
// 		config.headers['Authorization'] = `Bearer ${token}`; //eslint-disable-line
// 		return config;
// 	},
// 	(error) => {
//
// 	}
// );
//
// http.interceptors.response.use(
// 	(response) => (response.data ? response.data : response),
// 	(error) => {
// 		if (axios.isCancel(error)) return () => {};
// 		// if (error && error.response && error.response.status === 401) {
// 		// 	return cb();
// 		// }
// 		return Promise.reject(error);
// 	}
// );
