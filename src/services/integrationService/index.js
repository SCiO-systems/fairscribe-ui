/* eslint-disable class-methods-use-this */
import { http } from '../index';

class IntegrationService {
	listLanguages = async () => {
		const result = await http.get(`/integrations/languages`);
		return result.data;
	};

	getMimetype = async (filename) => {
		const result = await http.post(`/integrations/mimetypes`, { filename, type: 'dataset' });
		return result.data;
	};

	listVocabularies = async () => {
		const result = await http.get(`/integrations/vocabularies`);
		return result.data;
	};

	autocompleteTerm = async (index, term) => {
		const result = await http.get(`/integrations/vocabularies/autocomplete?index=${index}&term=${term}`);
		return result.data;
	};

	extractKeywords = async (text) => {
		const result = await http.post(`/integrations/vocabularies/terms/extract`, { text });
		return result.data;
	};

	listProjects = async () => {
		const result = await http.get(`/integrations/projects`);
		return result.data;
	};

	getResourceByGuardianId = async (id) => {
		const result = await http.post(`/integrations/gardianId`, {
			document_id: id,
		});
		return result.data;
	};

	autosuggestTerm = async (term) => {
		const result = await http.get(`/integrations/vocabularies/autosuggest?term=${term}`);
		return result.data;
	};
}
export default new IntegrationService();
