/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Column, DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const licenses = [
  {
    label: 'CC0 1.0',
    value: 'cc0',
  },
  {
    label: 'CC BY 4.0',
    value: 'cc-by-4.0',
  },
  {
    label: 'CC BY-SA 4.0',
    value: 'cc-by-sa-4.0',
  },
  {
    label: 'CC BY-ND 4.0',
    value: 'cc-by-nd-4.0',
  },
  {
    label: 'CC BY-NC 4.0',
    value: 'cc-by-nc-4.0',
  },
  {
    label: 'CC BY-NC-SA 4.0',
    value: 'cc-by-nc-sa-4.0',
  },
  {
    label: 'CC BY-NC-ND 4.0',
    value: 'cc-by-nc-nd-4.0',
  },
  {
    label: 'GNU AGPLv3',
    value: 'gnu-agpl-v3',
  },
  {
    label: 'GNU GPLv3',
    value: 'gnu-gpl-v3',
  },
  {
    label: 'GNU LGPLv3',
    value: 'gnu-lgpl-v3',
  },
  {
    label: 'Mozzila Public License 2.0',
    value: 'mozzila-public-license-2.0',
  },
  {
    label: 'Apache License 2.0',
    value: 'apache-license-2.0',
  },
  {
    label: 'MIT License',
    value: 'mit-license',
  },
  {
    label: 'Boost Software License 1.0',
    value: 'boost-software-license-1.0',
  },
  {
    label: 'The Unlicense',
    value: 'the-unlicense',
  },
];

const accessRights = [
  {
    label: 'Open Access',
    value: 'open',
  },
  {
    label: 'Restricted Access',
    value: 'restricted',
  },
];

const demoRightsHolders = [
  {
    type: 'Individual',
    name: 'John Doe',
    id: 'grid 0394302.323',
  },
  {
    type: 'Organization',
    name: 'Test Org',
    id: 'grid 33454.323',
  },
];

const types = [
  {
    label: 'Individual',
    value: 'individual',
  },
  {
    label: 'Organization',
    value: 'organization',
  },
];

const ResourceRights = ({ projectRights }) => {
  const { t } = useTranslation();
  const [license, setLicense] = useState('');
  const [accessRight, setAccessRight] = useState('');
  const [termsOfUse, setTermsOfUse] = useState('');
  const [rightsHolders, setRightsHolders] = useState(
    projectRights || demoRightsHolders
  );
  const [rightsHolder, setRightsHolder] = useState({});

  return (
    <Fieldset
      legend={t('RESOURCE_RIGHTS')}
      style={{ position: 'relative' }}
      className="relative p-mb-4"
    >
      <Button
        style={{ position: 'absolute', top: '-0.2rem', right: '1.6rem' }}
        label={t('CHECK_FAIR')}
      />
      <div className="p-fluid p-mt-2">
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="license">{t('RESOURCE_LICENSE')}</label>
            <Dropdown
              id="license"
              options={licenses}
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="accessRight">{t('RESOURCE_ACCESS_RIGHT')}</label>
            <Dropdown
              id="license"
              options={accessRights}
              value={accessRight}
              onChange={(e) => setAccessRight(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="keywords">{t('TERMS_OF_USE')}</label>
            <InputTextarea
              id="keywords"
              type="text"
              value={termsOfUse}
              rows={5}
              onChange={(e) => setTermsOfUse(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <DataTable
              header={t('RIGHTS_HOLDERS')}
              emptyMessage={t('NO_ENTRIES_FOUND')}
              value={rightsHolders}
              className="p-mt-4"
            >
              <Column
                field="type"
                header={t('RIGHTS_HOLDER_TYPE')}
                body={({ type }) => type}
              />
              <Column
                field="name"
                header={t('RIGHTS_HOLDER_NAME')}
                body={({ name }) => name}
              />
              <Column
                field="id"
                header={t('RIGHTS_HOLDER_ID')}
                body={({ id }) => id}
              />
              <Column
                header={t('ACTIONS')}
                body={() => (
                  <Button className="p-button-danger" icon="pi pi-trash" />
                )}
              />
            </DataTable>
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="rightsHolderType">{t('RIGHTS_HOLDER_TYPE')}</label>
            <Dropdown
              id="rightsHolderType"
              options={types}
              value={rightsHolder.type}
              onChange={(e) =>
                setRightsHolder({ ...rightsHolder, type: e.target.value })
              }
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="rightsHolderName">{t('RIGHTS_HOLDER_NAME')}</label>
            <InputText
              id="rightsHolderName"
              type="text"
              value={rightsHolder.name}
              onChange={(e) =>
                setRightsHolder({ ...rightsHolder, name: e.target.value })
              }
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="id">{t('RIGHTS_HOLDER_ID')}</label>
            <InputText
              id="id"
              type="text"
              value={rightsHolder.id}
              onChange={(e) =>
                setRightsHolder({ ...rightsHolder, id: e.target.value })
              }
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-3">
            <Button
              label={t('ADD_RIGHTS_HOLDER')}
              icon="pi pi-plus"
              className="p-mt-2 p-mb-2"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceRights;
