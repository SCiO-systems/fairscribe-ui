/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const licenses = [
  {
    label: 'Unspecified',
    value: '',
  },
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

const holderTypes = [
  { label: 'Individual', value: 'individual' },
  { label: 'Organisation', value: 'group/organisation' },
];

const ResourceRights = ({ initialData, setter }) => {
  const { t } = useTranslation();
  const [license, setLicense] = useState('');
  const [accessRight, setAccessRight] = useState('');
  const [type, setType] = useState('');
  const [termsOfUse, setTermsOfUse] = useState('');
  const [rightsHolders, setRightsHolders] = useState(
    initialData?.rights?.rights_holder || []
  );
  const [agentId, setAgentId] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');

  useEffect(() => {
    if (license !== '') {
      setAccessRight('open');
    }
  }, [license]);

  useEffect(() => {
    setter({
      license,
      access_right: accessRight,
      terms_of_use: [{ language: 'en', value: termsOfUse }],
      rights_holder: rightsHolders,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [license, accessRight, termsOfUse, rightsHolders]);

  const nameBodyTemplate = (rowData) => {
    if (rowData.agent_type === 'individual') {
      return `${rowData.name} ${rowData.last_name}`;
    }
    return rowData.name;
  };

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
              id="accessRight"
              disabled={license !== ''}
              options={accessRights}
              value={accessRight}
              onChange={(e) => setAccessRight(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="keywords">{t('TERMS_OF_USE')} (in English)</label>
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
              <Column field="agent_type" header={t('RIGHTS_HOLDER_TYPE')} />
              <Column
                field="name"
                header={t('RIGHTS_HOLDER_NAME')}
                body={nameBodyTemplate}
              />
              <Column field="agent_id" header={t('RIGHTS_HOLDER_ID')} />
              <Column
                className="p-text-right"
                body={(rowData) => (
                  <Button
                    className="p-button-danger"
                    icon="pi pi-trash"
                    onClick={() => {
                      setRightsHolders(
                        rightsHolders.filter(
                          (item) => item.agent_id !== rowData.agent_id
                        )
                      );
                    }}
                  />
                )}
              />
            </DataTable>
          </div>
        </div>
        <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
          <div className="p-col-10">
            <Dropdown
              id="agent_type"
              name="agent_type"
              value={type}
              options={holderTypes}
              onChange={(e) => setType(e.value)}
            />
          </div>
          <div className="p-col-2 p-text-right">
            <Button
              label={t('COLLECTION_TITLE_ADD')}
              icon="pi pi-plus"
              className="p-button-sm p-component"
              onClick={() => {
                setRightsHolders(
                  rightsHolders.concat({
                    agent_type: type,
                    agent_id: agentId,
                    name,
                    last_name: lastname,
                  })
                );
                setName('');
                setType('');
                setAgentId('');
                setLastname('');
              }}
            />
          </div>
        </div>
        {type.toLowerCase() === 'individual' && (
          <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
            <div className="p-col-12 p-field">
              <label htmlFor="agent_id">{t('ORCID')}</label>
              <InputText
                id="agent_id"
                name="agent_id"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              />
            </div>
            <div className="p-col-12 p-field">
              <label htmlFor="name">{t('NAME')}</label>
              <InputText
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="p-col-12 p-field">
              <label htmlFor="lastname">{t('LASTNAME')}</label>
              <InputText
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
        )}
        {type.toLowerCase() === 'group/organisation' && (
          <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
            <div className="p-col-12 p-field">
              <label htmlFor="agent_id">{t('GRID_ID')}</label>
              <InputText
                id="agent_id"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              />
            </div>
            <div className="p-col-12 p-field">
              <label htmlFor="name">{t('NAME')}</label>
              <InputText
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </Fieldset>
  );
};

export default ResourceRights;
