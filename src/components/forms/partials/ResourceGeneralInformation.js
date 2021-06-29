/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResourceCollectionsPicker from '../../pickers/ResourceCollectionsPicker';
import AuthorsTable from '../../tables/AuthorsTable';
import MultilingualEntriesTable from '../../tables/MultilingualEntries';
import Citation from './Citation';
import ContactPoints from './ContactPoints';
import FundingOrganizations from './FundingOrganizations';
import ProjectDetails from './ProjectDetails';
import ProjectPartners from './ProjectPartners';
import ResourceLanguages from './ResourceLanguages';

const ResourceGeneralInformation = ({ initialData, setter }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(initialData.title ?? []);
  const [description, setDescription] = useState(initialData.description ?? []);
  const [citation, setCitation] = useState(initialData.citation || '');
  const [collections, setCollections] = useState(initialData.collections || []);

  const addTitleLanguage = (language, value) => {
    setTitle(
      title
        .filter((item) => item.language !== language)
        .concat({ language, value })
    );
  };

  const addDescriptionLanguage = (language, value) => {
    setDescription(
      description
        .filter((item) => item.language !== language)
        .concat({ language, value })
    );
  };

  useEffect(() => {
    setter(title, description, citation);
  }, [title, description, citation]); //eslint-disable-line

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
        data={title}
        header={t('RESOURCE_TITLE')}
        onDeleteItem={(language) => {
          setTitle(title.filter((item) => item.language !== language));
        }}
        onAddItem={({ language, value }) => {
          addTitleLanguage(language, value);
        }}
      />
      <MultilingualEntriesTable
        className="p-mt-4"
        data={description}
        header={t('RESOURCE_DESCRIPTION')}
        onDeleteItem={(language) => {
          setDescription(
            description.filter((item) => item.language !== language)
          );
        }}
        onAddItem={({ language, value }) => {
          addDescriptionLanguage(language, value);
        }}
        multipleLines
      />
      <ResourceCollectionsPicker
        setCollections={setCollections}
        collections={collections}
        className="p-mt-4"
      />
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
      <ProjectDetails className="p-mt-4" />
      <ProjectPartners className="p-mt-4" />
      <FundingOrganizations className="p-mt-4" />
      <ContactPoints className="p-mt-4" />
      <Citation
        citation={citation}
        setCitation={setCitation}
        className="p-mt-4"
      />
    </Fieldset>
  );
};

export default ResourceGeneralInformation;
