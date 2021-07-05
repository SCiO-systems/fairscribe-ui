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
import LicenseWizardDialog from '../../dialogs/LicenseWizardDialog';

const licenses = [
  {
    label: 'Unlicensed',
    value: '',
  },
  {
    label: 'CC0 1.0',
    value: 'CC0 1.0',
  },
  {
    label: 'CC BY 4.0',
    value: 'CC BY 4.0',
  },
  {
    label: 'CC BY-SA 4.0',
    value: 'CC BY-SA 4.0',
  },
  {
    label: 'CC BY-ND 4.0',
    value: 'CC BY-ND 4.0',
  },
  {
    label: 'CC BY-NC 4.0',
    value: 'CC BY-NC 4.0',
  },
  {
    label: 'CC BY-NC-SA 4.0',
    value: 'CC BY-NC-SA 4.0',
  },
  {
    label: 'CC BY-NC-ND 4.0',
    value: 'CC BY-NC-ND 4.0',
  },
  {
    label: 'GNU AGPLv3',
    value: 'GNU AGPLv3',
  },
  {
    label: 'GNU GPLv3',
    value: 'GNU GPLv3',
  },
  {
    label: 'GNU LGPLv3',
    value: 'GNU LGPLv3',
  },
  {
    label: 'Mozilla Public License 2.0',
    value: 'Mozilla Public License 2.0',
  },
  {
    label: 'Apache License 2.0',
    value: 'Apache License 2.0',
  },
  {
    label: 'MIT License',
    value: 'MIT License',
  },
  {
    label: 'Boost Software License 1.0',
    value: 'Boost Software License 1.0',
  },
  {
    label: 'The Unlicense',
    value: 'The Unlicense',
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

const ResourceRights = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [license, setLicense] = useState(initialData?.rights?.license || '');
  const [licenseWizardDialog, setLicenseWizardDialog] = useState(false);
  const [accessRight, setAccessRight] = useState(
    initialData?.rights?.access_right || ''
  );
  const [type, setType] = useState('');
  const [termsOfUse, setTermsOfUse] = useState(
    initialData?.rights?.terms_of_use[0]?.value || ''
  );
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
      <div className="p-fluid p-mt-2">
        <div className="p-formgrid p-grid p-d-flex p-ai-end">
          <div
            className={mode === 'edit' ? 'p-field p-col-9' : 'p-field p-col-12'}
          >
            <label htmlFor="license">{t('RESOURCE_LICENSE')}</label>
            <Dropdown
              disabled={mode === 'review'}
              id="license"
              options={licenses}
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              required
            />
          </div>
          {mode === 'edit' && (
            <div className="p-field p-col-3 p-md-3">
              <Button
                label={t('LICENSE_WIZARD')}
                onClick={() => setLicenseWizardDialog(!licenseWizardDialog)}
              />
            </div>
          )}
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="accessRight">{t('RESOURCE_ACCESS_RIGHT')}</label>
            <Dropdown
              id="accessRight"
              disabled={license !== '' || mode === 'review'}
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
              disabled={mode === 'review'}
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
              {mode === 'edit' && (
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
              )}
            </DataTable>
          </div>
        </div>
        {mode === 'edit' && (
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
        )}
        {mode === 'edit' && type.toLowerCase() === 'individual' && (
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
        {mode === 'edit' && type.toLowerCase() === 'group/organisation' && (
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
      {mode === 'edit' && (
        <LicenseWizardDialog
          setDialogOpen={setLicenseWizardDialog}
          dialogOpen={licenseWizardDialog}
          setLicense={setLicense}
        />
      )}
    </Fieldset>
  );
};

export default ResourceRights;
