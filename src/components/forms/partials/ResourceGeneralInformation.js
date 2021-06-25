/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ResourceCollectionsPicker from '../../pickers/ResourceCollectionsPicker';
import AuthorsTable from '../../tables/AuthorsTable';
import MultilingualEntriesTable from '../../tables/MultilingualEntries';
import ResourceLanguages from './ResourceLanguages';

const titles = [
  {
    lang: 'English',
    text: 'Gene action controlling normalized difference vegetation index in crosses of elite maize (Zea mays L.) inbred lines',
  },
];

const descriptions = [
  {
    lang: 'English',
    text: 'The quest for precise and rapid phenotyping of germplasm is increasing the interest of breeders and physiologiest in the application of remote sensing techniques in maize breeding. Twenty-four drought-rolerant maize inbred awere crossed using a modified North Carolina II matting scheme to generate 96 single-cross hybrids.',
  },
];

const collections = [
  'Collection 1',
  'Collection 2',
  'Collection 3',
  'Collection 4',
  'Collection 5',
  'Collection 6',
];

const ResourceGeneralInformation = () => {
  const { t } = useTranslation();

  return (
    <Fieldset
      legend={t('RESOURCE_GENERAL_INFORMATION')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <Button
        style={{ position: 'absolute', top: '-0.6rem', right: '1.4rem' }}
        label={t('CHECK_FAIR')}
      />
      <MultilingualEntriesTable
        className="p-mt-4"
        data={titles}
        header={t('RESOURCE_TITLE')}
        onDeleteItem={(lang) => console.log('About to delete lang:', lang)}
        onAddItem={(lang) => console.log('About to add lang:', lang)}
      />
      <MultilingualEntriesTable
        className="p-mt-4"
        data={descriptions}
        header={t('RESOURCE_DESCRIPTION')}
        onDeleteItem={(lang) => console.log('About to delete lang:', lang)}
        onAddItem={(lang) => console.log('About to add lang:', lang)}
        multipleLines
      />
      <ResourceCollectionsPicker collections={collections} className="p-mt-4" />
      <ResourceLanguages
        header={t('RESOURCE_LANGUAGES_TITLE')}
        onDeleteItem={(lang) => console.log('About to delete lang:', lang)}
        onAddItem={(lang) => console.log('About to add lang:', lang)}
        multipleLines
        languages={[]}
        className="p-mt-4"
      />
      <AuthorsTable header={t('AUTHORS_TITLE')} className="p-mt-4" />
      <AuthorsTable header={t('METADATA_AUTHORS_TITLE')} className="p-mt-4" />
    </Fieldset>
  );
};

export default ResourceGeneralInformation;
