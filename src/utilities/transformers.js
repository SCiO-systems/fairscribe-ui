/* eslint-disable camelcase */

export const transformLanguages = (languages) =>
	languages.map(({ iso_language_name, iso_code_639_1, iso_code_639_2 }) => ({
		name: iso_language_name,
		iso_code_639_1,
		iso_code_639_2,
	}));

export const getEnglishValue = (text) =>
	text.filter(({ language }) => language?.value === 'English')?.pop()?.value || '';

export const transformOrgValue = ({ value }) => {
	return ({
		id: value?.id?.replace('https://ror.org/', ''),
		fullname: value?.name,
		shortname: value?.aliases[0],
		email: value?.email,
		url: value?.links[0],
	});
};

export const transformFundingOrgValue = ({ value }) => {
	return ({
		url: value?.URL,
		id: value?.ror,
		fullname: value?.full_name,
		shortname: value?.short_name,
		email: value?.email,
	});
};
