/* eslint-disable camelcase */

export const transformLanguages = (languages) =>
  languages.map(({ name, iso_code_639_1, iso_code_639_2 }) => ({
    name,
    iso_code_639_1,
    iso_code_639_2,
  }));

export const getEnglishValue = (text) =>
  text.filter(({ language }) => language?.value === 'English')?.pop()?.value || '';

export const transformOrgValue = ({ value }) => ({
  id: value?.id?.replace('https://ror.org/', ''),
  fullname: value?.name,
  shortname: value?.acronyms[0],
  email: value?.email,
  url: value?.links[0],
});

export const transformFundingOrgValue = ({ value }) => ({
  id: value?.agent_ids[0]?.value,
  fullname: value?.full_name,
  shortname: value?.short_name,
  email: value?.email,
  url: value?.url,
});
