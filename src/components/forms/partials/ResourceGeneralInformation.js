/* eslint-disable react-hooks/exhaustive-deps */
import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResourceCollectionsPicker from '../../pickers/ResourceCollectionsPicker';
import MultilingualEntriesTable from '../../tables/MultilingualEntries';
import Citation from './Citation';
import ResourceLanguage from './ResourceLanguages';

const ResourceGeneralInformation = ({
  initialData,
  setter,
  mode,
  availableLanguages,
  teamCollections,
  selectedCollections,
  setTeamCollections,
  setSelectedCollections,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(initialData?.title || []);
  const [description, setDescription] = useState(initialData?.description || []);
  const [citation, setCitation] = useState(initialData?.citation || '');
  const [resourceLanguage, setResourceLanguage] = useState(initialData?.resource_language || []);

  const addTitleLanguage = (language, value) => {
    setTitle(
      title.filter((item) => item.language.value !== language.value).concat({ language, value })
    );
  };

  const addDescriptionLanguage = (language, value) => {
    setDescription(
      description
        .filter((item) => item.language.value !== language.value)
        .concat({ language, value })
    );
  };

  useEffect(() => {
    setter(title, description, resourceLanguage, citation);
  }, [title, description, resourceLanguage, citation]);

  useEffect(() => {
    setter(title, description, resourceLanguage, citation);
  }, []);

  return (
    <Fieldset legend={t('RESOURCE_GENERAL_INFORMATION')} className="p-mb-4">
      <div id="resource-title">
        <MultilingualEntriesTable
          mode={mode}
          data={title}
          availableLanguages={availableLanguages}
          header={t('RESOURCE_TITLE')}
          onDeleteItem={(l) => setTitle(title.filter(({ language }) => language.value !== l))}
          onAddItem={({ language, value }) => addTitleLanguage(language, value)}
        />
      </div>
      <div id="resource-description">
        <MultilingualEntriesTable
          mode={mode}
          data={description}
          availableLanguages={availableLanguages}
          className="p-mt-4"
          header={t('RESOURCE_DESCRIPTION')}
          onDeleteItem={(l) =>
            setDescription(description.filter(({ language: { value } }) => value !== l))
          }
          onAddItem={({ language, value }) => addDescriptionLanguage(language, value)}
          multipleLines
        />
      </div>
      <ResourceCollectionsPicker
        mode={mode}
        setSelectedCollections={setSelectedCollections}
        selectedCollections={selectedCollections}
        setTeamCollections={setTeamCollections}
        teamCollections={teamCollections}
      />
      <ResourceLanguage
        mode={mode}
        availableLanguages={availableLanguages}
        language={resourceLanguage}
        setLanguage={setResourceLanguage}
      />
      <Citation mode={mode} citation={citation} setCitation={setCitation} className="p-mt-4" />
    </Fieldset>
  );
};

export default ResourceGeneralInformation;
