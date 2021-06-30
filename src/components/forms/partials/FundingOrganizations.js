import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FundingOrganizations = ({
  fundingOrganizations,
  setFundingOrganizations,
}) => {
  const { t } = useTranslation();
  const [agentId, setAgentId] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <DataTable
            header={t('FUNDING_ORGANIZATIONS')}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={fundingOrganizations}
            className="p-mt-4"
          >
            <Column field="name" header={t('NAME')} />
            <Column field="agent_id" header={t('ID')} />
            <Column
              header={t('ACTIONS')}
              body={(rowData) => (
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => {
                    setFundingOrganizations(
                      fundingOrganizations.filter(
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
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="funding-grid">{t('GRID_ID')}</label>
          <InputText
            id="funding-grid"
            type="text"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="orgName">{t('SEARCH_GRID_WITH_ORG_NAME')}</label>
          <InputText
            id="orgName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-4">
          <Button
            label={t('ADD_FUNDING_ORG')}
            icon="pi pi-plus"
            className="p-mt-2 p-mb-2"
            onClick={() => {
              setFundingOrganizations(
                fundingOrganizations
                  .filter((item) => item.agent_id !== agentId)
                  .concat({
                    name,
                    agent_id: agentId,
                  })
              );
              setName('');
              setAgentId('');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FundingOrganizations;
