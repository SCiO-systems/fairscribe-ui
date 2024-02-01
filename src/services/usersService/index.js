/* eslint-disable class-methods-use-this */
import { http } from '../index';

class UsersService {
	getUserStats = async (id) => {
		const result = await http.get(`/users/${id}/stats`);
		return result.data;
	};

	getUserProfile = async (id) => {
		const result = await http.get(`/users/${id}`);
		return result.data;
	};

	updateUserProfile = async (id, data) => {
		const result = await http.get(`/users/${id}`, data);
		return result.data;
	};

	getUserAvatar = async (id) => {
		const result = await http.get(`/users/${id}/avatar`);
		return result.data;
	};

	updateUserAvatar = async (id, data) => {
		const result = await http.post(`/users/${id}/avatar`, data, {
			'Content-Type': 'multipart/form-data',
		});
		return result.data;
	};

	changeUserPassword = async (id, data) => {
		const result = await http.put(`/users/${id}/password`, data);
		return result.data;
	};

	registerUser = async (data) => {
		const result = await http.post(`/register`, data);
		return result.data;
	};

	searchUsers = async (name) => {
		const result = await http.get(`/users?name=${name}`);
		return result.data;
	};
}

export default new UsersService();
