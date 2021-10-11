/* eslint-disable react-hooks/exhaustive-deps */
import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getAllCollections } from '../../../services/teams';
import ResourceCollectionsPicker from '../../pickers/ResourceCollectionsPicker';
import AuthorsTable from '../../tables/AuthorsTable';
import MultilingualEntriesTable from '../../tables/MultilingualEntries';
import Citation from './Citation';
import ContactPoints from './ContactPoints';
import FundingOrganizations from './FundingOrganizations';
import ProjectDetails from './ProjectDetails';
import ResourceLanguage from './ResourceLanguages';

const ResourceGeneralInformation = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const { teamId } = useParams();
  const [title, setTitle] = useState(initialData?.title || []);
  const [description, setDescription] = useState(initialData?.description || []);
  const [citation, setCitation] = useState(initialData?.citation || '');
  const [teamCollections, setTeamCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState(initialData?.collections || []);
  const [resourceLanguage, setResourceLanguage] = useState(initialData?.resource_language || []);
  const [authors, setAuthors] = useState(initialData.authors || []);
  const [projectId, setProjectId] = useState(initialData.project_id || '');
  const [projectNames, setProjectNames] = useState(initialData?.project_name || '');
  const [fundingOrganizations, setFundingOrganizations] = useState(
    initialData?.funding_organisations || []
  );
  const [contactPoints, setContactPoints] = useState(initialData?.contact_point || []);

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
    const name = [
      {
        language: 'en',
        value: (projectNames[0] && projectNames[0].value) || '',
      },
    ];
    setter(
      title,
      description,
      resourceLanguage,
      authors,
      projectId,
      name,
      fundingOrganizations,
      contactPoints,
      citation
    );
  }, [
    title,
    description,
    resourceLanguage,
    authors,
    projectId,
    projectNames,
    fundingOrganizations,
    contactPoints,
    citation,
  ]);

  useEffect(() => {
    // Get the collections that are available to the team.
    if (teamId) {
      getAllCollections(teamId).then(({ data }) => {
        setTeamCollections(data);
      });
    }
  }, []);

  return (
    <Fieldset
      legend={t('RESOURCE_GENERAL_INFORMATION')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <MultilingualEntriesTable
        mode={mode}
        data={title}
        header={t('RESOURCE_TITLE')}
        onDeleteItem={(l) => setTitle(title.filter(({ language }) => language.value !== l))}
        onAddItem={({ language, value }) => addTitleLanguage(language, value)}
      />
      <MultilingualEntriesTable
        mode={mode}
        className="p-mt-4"
        data={description}
        header={t('RESOURCE_DESCRIPTION')}
        onDeleteItem={(l) =>
          setDescription(description.filter(({ language: { value } }) => value !== l))
        }
        onAddItem={({ language, value }) => addDescriptionLanguage(language, value)}
        multipleLines
      />
      <ResourceCollectionsPicker
        mode={mode}
        setSelectedCollections={setSelectedCollections}
        selectedCollections={selectedCollections}
        setTeamCollections={setTeamCollections}
        teamCollections={teamCollections}
      />
      <ResourceLanguage
        mode={mode}
        availableLanguages={[]}
        language={resourceLanguage}
        setLanguage={setResourceLanguage}
      />
      <AuthorsTable
        mode={mode}
        authors={authors}
        setAuthors={setAuthors}
        header={t('AUTHORS_TITLE')}
        className="p-mt-4"
      />
      <ProjectDetails
        mode={mode}
        projectId={projectId}
        setProjectId={setProjectId}
        projectNames={projectNames}
        setProjectNames={setProjectNames}
        className="p-mt-4"
      />
      <FundingOrganizations
        mode={mode}
        fundingOrganizations={fundingOrganizations}
        setFundingOrganizations={setFundingOrganizations}
        className="p-mt-4"
      />
      <ContactPoints
        mode={mode}
        contactPoints={contactPoints}
        setContactPoints={setContactPoints}
        className="p-mt-4"
      />
      <Citation mode={mode} citation={citation} setCitation={setCitation} className="p-mt-4" />
    </Fieldset>
  );
};

export default ResourceGeneralInformation;
