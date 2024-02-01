/* eslint-disable class-methods-use-this */
import { http } from '../index';

class CollectionService {
	getTeamCollections = async (teamId, page = 1) => {
		const result = await http.get(`/teams/${teamId}/collections?page=${page}`);
		return result.data;
	};

	getSingleTeamCollection = async (teamId, collectionId) => {
		const result = await http.get(`/teams/${teamId}/collections/${collectionId}`);
		return result.data;
	};

	createTeamCollection = async (teamId, data) => {
		const result = await http.post(`/teams/${teamId}/collections/`, data);
		return result.data;
	};

	updateTeamCollection = async (teamId, collectionId, data) => {
		const result = await http.put(`/teams/${teamId}/collections/${collectionId}`, data);
		return result.data;
	};

	deleteTeamCollection = async (teamId, collectionId) => {
		const result = await http.delete(`/teams/${teamId}/collections/${collectionId}`);
		return result.data;
	};
}

export default new CollectionService();
