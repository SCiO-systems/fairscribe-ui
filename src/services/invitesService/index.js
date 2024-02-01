/* eslint-disable class-methods-use-this */
import { http } from '../index';

class InvitesService {
	getMyInvites = async (userId) => {
		const result = await http.get(`/users/${userId}/invites`);
		return result.data;
	};

	acceptInvite = async (userId, invitationId) => {
		const result = await http.post(`/users/${userId}/invites/${invitationId}/accept`);
		return result.data;
	};

	rejectInvite = async (userId, invitationId) => {
		const result = await http.post(`/users/${userId}/invites/${invitationId}/reject`);
		return result.data;
	};
}

export default new InvitesService();
