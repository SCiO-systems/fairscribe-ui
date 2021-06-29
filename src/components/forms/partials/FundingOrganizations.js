import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const demoOrgs = [
  {
    name: 'Centro Internacional de Agricultura Tropical',
    id: 'grid.499882.6',
  },
];

const FundingOrganizations = ({ fundingOrgs }) => {
  const { t } = useTranslation();
  const [organizations, setOrganizations] = useState(fundingOrgs || demoOrgs);
  const [organization, setOrganization] = useState({});

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <DataTable
            header={t('FUNDING_ORGANIZATIONS')}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={organizations}
            className="p-mt-4"
          >
            <Column
              field="name"
              header={t('FUNDING_ORGANIZATION_NAME')}
              body={({ name }) => name}
            />
            <Column field="id" header={t('ID')} body={({ id }) => id} />
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
          <label htmlFor="funding-grid">{t('GRID_ID')}</label>
          <InputText
            id="funding-grid"
            type="text"
            value={organization.id}
            onChange={(e) => setOrganization({ id: e.target.value })}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="orgName">{t('SEARCH_GRID_WITH_ORG_NAME')}</label>
          <InputText
            id="orgName"
            type="text"
            value={organization.name}
            onChange={(e) => setOrganization({ name: e.target.value })}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-4">
          <Button
            label={t('ADD_FUNDING_ORG')}
            icon="pi pi-plus"
            className="p-mt-2 p-mb-2"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default FundingOrganizations;
