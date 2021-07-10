import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GridAutoComplete from '../../autocomplete-inputs/GridAutoComplete';

const FundingOrganizations = ({
  mode,
  fundingOrganizations,
  setFundingOrganizations,
}) => {
  const { t } = useTranslation();
  const [agentId, setAgentId] = useState('');
  const [name, setName] = useState('');

  const setGridResult = (result) => {
    setAgentId(result.agent_id);
    setName(result.name);
  };

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
            {mode === 'edit' && (
              <Column
                body={(rowData) => (
                  <div className="p-text-right">
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
                  </div>
                )}
              />
            )}
          </DataTable>
        </div>
      </div>
      {mode === 'edit' && (
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="grid-org-name">
              {t('SEARCH_GRID_WITH_ORG_NAME')}
            </label>
            <GridAutoComplete onChange={setGridResult} />
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
      )}
    </div>
  );
};

export default FundingOrganizations;
