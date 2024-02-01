/* eslint-disable class-methods-use-this */
import { http } from '../index';

class TeamsService {
	getAllOwnedTeams = async (userId) => {
		const result = await http.get(`/users/${userId}/teams/all`);
		return result.data;
	};

	getOwnedTeams = async (userId, page = 1) => {
		const result = await http.get(`/users/${userId}/teams?page=${page}`);
		return result.data;
	};

	getAllSharedTeams = async () => {
		const result = await http.get(`/teams/all`);
		return result.data;
	};

	getSharedTeams = async (page = 1) => {
		const result = await http.get(`/teams?page=${page}`);
		return result.data;
	};

	getSingleTeam = async (teamId) => {
		const result = await http.get(`/teams/${teamId}`);
		return result.data;
	};

	createTeam = async (userId, data) => {
		const result = await http.post(`/users/${userId}/teams`, { ...data });
		return result.data;
	};

	deleteTeam = async (teamId) => {
		const result = await http.delete(`/teams/${teamId}`);
		return result.data;
	};

	updateTeam = async (userId, teamId, data) => {
		const result = await http.put(`/users/${userId}/teams/${teamId}`, { ...data });
		return result.data;
	};

	inviteUsers = async (teamId, users) => {
		const result = await http.post(`/teams/${teamId}/invite`, { users });
		return result.data;
	};

	getAllCollections = async (teamId) => {
		const result = await http.get(`/teams/${teamId}/collections/all`);
		return result.data;
	};

	getResources = async (teamId, status = 'published', page = 1) => {
		const result = await http.get(`/teams/${teamId}/resources?status=${status}&page=${page}`);
		return result.data;
	};

	getSingleResource = async (teamId, resourceId) => {
		const result = await http.get(`/teams/${teamId}/resources/${resourceId}`);
		return result.data;
	};

	createResource = async (teamId, data) => {
		const result = await http.post(`/teams/${teamId}/resources`, { ...data });
		return result.data;
	};

	publishResource = async (teamId, resourceId, repoId, data = {}) => {
		const result = await http.post(`/teams/${teamId}/resources/${resourceId}/publish`, {
			repository_id: repoId,
			...data,
		});
		return result.data;
	};
}

export default new TeamsService();
