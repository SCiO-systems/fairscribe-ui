/* eslint-disable camelcase */

export const transformLanguages = (languages) =>
  languages.map(({ name, iso_code_639_1, iso_code_639_2 }) => ({
    name,
    iso_code_639_1,
    iso_code_639_2,
  }));

export const getEnglishValue = (text) =>
  text.filter(({ language }) => language?.value === 'English')?.pop()?.value || '';
