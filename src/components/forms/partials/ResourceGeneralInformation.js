/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'primereact/button';
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
import ProjectPartners from './ProjectPartners';
import ResourceLanguages from './ResourceLanguages';

const ResourceGeneralInformation = ({ initialData, setter }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(initialData.title ?? []);
  const [description, setDescription] = useState(initialData.description ?? []);
  const [citation, setCitation] = useState(initialData.citation || '');
  const [teamCollections, setTeamCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState(
    initialData.collections || []
  );
  const [languages, setLanguages] = useState(initialData.languages || []);
  const [authors, setAuthors] = useState(initialData.authors || []);
  const [metadataAuthors, setMetadataAuthors] = useState(
    initialData.metadata_authors || []
  );
  const [projectId, setProjectId] = useState(initialData.project_id || '');
  const [projectName, setProjectName] = useState(
    initialData.project_name || ''
  );
  const [projectPartners, setProjectPartners] = useState(
    initialData.project_partners || []
  );
  const [fundingOrganizations, setFundingOrganizations] = useState(
    initialData.funding_organisations || []
  );
  const [contactPoints, setContactPoints] = useState(
    initialData.contact_point || []
  );

  const { teamId } = useParams();

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
    const langs = languages.map((item) => item.value);
    const name = [{ language: 'en', value: projectName }];
    setter(
      title,
      description,
      langs,
      authors,
      metadataAuthors,
      projectId,
      name,
      projectPartners,
      fundingOrganizations,
      contactPoints,
      citation
    );
  }, [
    title,
    description,
    languages,
    authors,
    metadataAuthors,
    projectId,
    projectName,
    projectPartners,
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
        setSelectedCollections={setSelectedCollections}
        selectedCollections={selectedCollections}
        setTeamCollections={setTeamCollections}
        teamCollections={teamCollections}
        className="p-mt-4"
      />
      <ResourceLanguages
        header={t('RESOURCE_LANGUAGES_TITLE')}
        multipleLines
        languages={languages}
        setLanguages={setLanguages}
        className="p-mt-4"
      />
      <AuthorsTable
        authors={authors}
        setAuthors={setAuthors}
        header={t('AUTHORS_TITLE')}
        className="p-mt-4"
      />
      <AuthorsTable
        authors={metadataAuthors}
        setAuthors={setMetadataAuthors}
        header={t('METADATA_AUTHORS_TITLE')}
        className="p-mt-4"
      />
      <ProjectDetails
        projectId={projectId}
        setProjectId={setProjectId}
        projectName={projectName}
        setProjectName={setProjectName}
        className="p-mt-4"
      />
      <ProjectPartners
        projectPartners={projectPartners}
        setProjectPartners={setProjectPartners}
        className="p-mt-4"
      />
      <FundingOrganizations
        fundingOrganizations={fundingOrganizations}
        setFundingOrganizations={setFundingOrganizations}
        className="p-mt-4"
      />
      <ContactPoints
        contactPoints={contactPoints}
        setContactPoints={setContactPoints}
        className="p-mt-4"
      />
      <Citation
        citation={citation}
        setCitation={setCitation}
        className="p-mt-4"
      />
    </Fieldset>
  );
};

export default ResourceGeneralInformation;
