/* eslint-disable class-methods-use-this */
import { http } from '../index';

class AuthService {
	login = async (email, password) => {
		const result = await http.post('/login', { email, password });
		return result.data;
	};

	logout = async () => {
		const result = await http.post('/logout');
		return result.data;
	};

	verify = async (token) => {
		const result = await http.get('/auth/token/check', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	};
}

export default new AuthService();
