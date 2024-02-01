/* eslint-disable class-methods-use-this */
import { http } from '../index';

class RepositoriesService {
	getRepositoryTypes = async () => {
		const result = await http.get(`/repository_types`);
		return result.data;
	};

	getRepositoryTypes2 = async () => {
		const result = await http.get(`/repository/types`);
		return result.data;
	};

	getRepositories = async () => {
		const result = await http.get(`/repositories/all`);
		return result.data;
	};

	getRepository = async (repositoryId) => {
		const result = await http.get(`/repositories/${repositoryId}`);
		return result.data;
	};

	createRepository = async (data) => {
		const result = await http.post(`/repositories`, data);
		return result.data;
	};

	updateRepository = async (repositoryId, data) => {
		const result = await http.put(`/repositories/${repositoryId}`, data);
		return result.data;
	};

	deleteRepository = async (repositoryId) => {
		const result = await http.delete(`/repositories/${repositoryId}`);
		return result.data;
	};

	verifyConnection = async (repositoryId) => {
		const result = await http.post(`/repositories/${repositoryId}/verify_connection`);
		return result.data;
	};
}

export default new RepositoriesService();
