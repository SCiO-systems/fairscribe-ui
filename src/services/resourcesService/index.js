/* eslint-disable class-methods-use-this */
import { http } from '../index';

class ResourcesService {
	getResourceTypes = async () => {
		const result = await import('../../data/resourcetypes/types.json');
		return result.default;
	};

	getResourceFiles = async (teamId, resourceId) => {
		const result = await http.get(`/teams/${teamId}/resources/${resourceId}/files`);
		return result.data;
	};

	getTeamCollectionResources = async (teamId, collectionId, status) => {
		const result = await http.get(`/teams/${teamId}/collections/${collectionId}/resources?status=${status}`);
		return result.data;
	};

	uploadFile = async (teamId, resourceId, data) => {
		const result = await http.post(`/teams/${teamId}/resources/${resourceId}/files`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			} });
		return result.data;
	};

	getThumbnailURL = async (teamId, resourceId, thumbId) => {
		const result = await http.get(`/teams/${teamId}/resources/${resourceId}/thumbnails/${thumbId}`);
		return result.data;
	};

	updateResource = async (teamId, resourceId, data) => {
		const result = await http.put(`/teams/${teamId}/resources/${resourceId}`, data);
		return result.data;
	};

	updateResourceStatus = async (teamId, resourceId, status) => {
		const result = await http.put(`/teams/${teamId}/resources/${resourceId}/update/status`, status);
		return result.data;
	};

	updateResourceComments = async (teamId, resourceId, data) => {
		const result = await http.put(`/teams/${teamId}/resources/${resourceId}/comments`, data);
		return result.data;
	};

	deleteFile = async (teamId, resourceId, id) => {
		const result = await http.delete(`/teams/${teamId}/resources/${resourceId}/files/${id}`);
		return result.data;
	};

	uploadThumbnail = async (teamId, resourceId, data) => {
		const result = await http.post(`/teams/${teamId}/resources/${resourceId}/thumbnails`, data, {
			'Content-Type': 'multipart/form-data',
		});
		return result.data;
	};

	deleteThumbnail = async (teamId, resourceId, id) => {
		const result = await http.delete(`/teams/${teamId}/resources/${resourceId}/thumbnails/${id}`);
		return result.data;
	};

	deleteTeamResource = async (teamId, resourceId) => {
		const result = await http.delete(`/teams/${teamId}/resources/${resourceId}`);
		return result.data;
	};

	calculateFairScore = async (teamId, resourceId) => {
		const result = await http.post(`teams/${teamId}/resources/${resourceId}/fairscore`);
		return result.data;
	};

	acceptPIITerms = async (teamId, resourceId, resourceFileId) => {
		const result = await http.post(`teams/${teamId}/resources/${resourceId}/files/${resourceFileId}/accept_pii_terms`);
		return result.data;
	};

	getPIIReport = async (teamId, resourceId, resourceFileId) => {
		const result = await http.get(`teams/${teamId}/resources/${resourceId}/files/${resourceFileId}/pii_report`);
		return result.data;
	};

	uploadAnnotation = async (teamId, resourceId, file) => {
		const result = await http.post(`teams/${teamId}/resources/${resourceId}/files/annotate`, file);
		return result.data;
	};

	getResourceFileHeaders = async (resourceFileId, delimiter) => {
		const result = await http.post(`/files/${resourceFileId}/annotation/headers`, {
			delimiter,
		});
		return result.data;
	};
}

export default new ResourcesService();
