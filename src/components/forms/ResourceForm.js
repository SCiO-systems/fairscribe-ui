import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const sampleMembers = [
  { label: 'John Doe', value: 123 },
  { label: 'Jane Doe', value: 425 },
  { label: 'Peter Jackson', value: 982 },
];

const resourceTypes = [
  { label: 'Document', value: 'document' },
  { label: 'Digital Asset', value: 'digitalasset' },
  { label: 'Geospatial Asset', value: 'geospatialasset' },
  { label: 'Data', value: 'data' },
];

const resourceSubtypes = {
  document: [
    { label: 'Journal Article', value: 'journal' },
    {
      label: 'Conference Paper / Poster / Presentation',
      value: 'conferencepaper',
    },
    {
      label: 'Book Chapter',
      value: 'bookchapter',
    },
    {
      label: 'Maganize Article / Press Item',
      value: 'magazinearticle',
    },
    {
      label: 'Journal',
      value: 'journal',
    },
  ],
  digitalasset: [
    { label: 'Infographic', value: 'infographic' },
    {
      label: 'Multimedia',
      value: 'multimedia',
    },
    {
      label: 'Software',
      value: 'software',
    },
    {
      label: 'Source Code',
      value: 'sourcecode',
    },
  ],
};

const ResourceForm = ({ setTaskFormOpen, resource }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState((resource && resource.title) || '');
  const [description, setDescription] = useState(
    (resource && resource.description) || '',
  );
  const [type, setType] = useState('');
  const [subtype, setSubtype] = useState('');
  const [authoringTeamMembers, setAuthoringTeamMembers] = useState([]);

  return (
    <Fieldset
      className="p-my-2"
      legend={resource ? t('EDIT_RESOURCE') : t('NEW_RESOURCE')}
    >
      {/* Title */}
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-5">
          <div className="p-field">
            <label htmlFor="resource-title">{t('RESOURCE_TITLE')}</label>
            <InputText
              id="resource-title"
              value={title}
              onChange={(e) => setTitle(e.value)}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-5">
          <div className="p-field">
            <label htmlFor="resource-description">
              {t('RESOURCE_DESCRIPTION')}
            </label>
            <InputTextarea
              id="resource-description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.value)}
            />
          </div>
        </div>
      </div>
      {/* Type */}
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-5">
          <div className="p-field">
            <label htmlFor="resource-type">{t('RESOURCE_TYPE')}</label>
            <Dropdown
              id="resource-type"
              value={type}
              options={resourceTypes}
              placeholder={t('RESOURCE_TYPE')}
              onChange={(e) => setType(e.value)}
            />
          </div>
        </div>
      </div>
      {/* Subtypes */}
      {resourceSubtypes[type] && resourceSubtypes[type].length && (
        <div className="p-fluid p-grid p-justify-start">
          <div className="p-col-12 p-md-6 p-lg-5">
            <div className="p-field">
              <label htmlFor="resource-subtype">{t('RESOURCE_SUBTYPE')}</label>
              <Dropdown
                id="resource-subtype"
                value={subtype}
                options={resourceSubtypes[type]}
                placeholder={t('RESOURCE_SUBTYPE')}
                onChange={(e) => setSubtype(e.value)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="p-fluid p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-5">
          <div className="p-field">
            <label htmlFor="authoring-team">
              {t('RESOURCE_METADATA_AUTHORING_TEAM')}
            </label>
            <MultiSelect
              id="members"
              value={authoringTeamMembers}
              options={sampleMembers}
              onChange={(e) => setAuthoringTeamMembers(e.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-grid p-justify-start">
        <div className="p-col-12 p-md-6 p-lg-5">
          <div className="p-d-flex p-jc-between">
            <Button
              label={t('CLEAR_ALL_FIELDS')}
              className="p-mr-4 p-button-secondary"
              onClick={() => {
                setTitle('');
                setDescription('');
                setType('');
                setSubtype('');
                setAuthoringTeamMembers('');
              }}
            />
            <Button
              label={t('CREATE_TASK_AND_SEND_INVITES')}
              onClick={() => setTaskFormOpen(false)}
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceForm;
