/* eslint-disable class-methods-use-this */
import { http } from '../index';

class DoiService {
	validateDoi = async (doi, title) => {
		const result = await http.post(`/integrations/doi`, { doi, title });
		return result.data;
	};
}

export default new DoiService();
