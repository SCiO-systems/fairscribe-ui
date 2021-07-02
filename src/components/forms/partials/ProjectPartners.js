import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProjectPartners = ({ mode, projectPartners, setProjectPartners }) => {
  const { t } = useTranslation();
  const [agentId, setAgentId] = useState('');
  const [name, setName] = useState('');

  const setLeadingPartner = (id) => {
    const partners = projectPartners.map((partner) => {
      if (partner.agent_id === id) {
        return { ...partner, is_leader: true };
      }
      return { ...partner, is_leader: false };
    });
    setProjectPartners(partners);
  };

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <DataTable
            header={t('PROJECT_PARTNERS')}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={projectPartners}
            className="p-mt-4"
          >
            <Column
              field="is_leader"
              header={t('LEADER')}
              body={(rowData) => (
                <div
                  className="p-text-left"
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    mode === 'edit' && setLeadingPartner(rowData.agent_id);
                  }}
                >
                  {rowData.is_leader ? (
                    <span
                      className="p-badge p-component p-badge-dot p-badge-primary"
                      style={{ border: '1px solid #2196F3' }}
                    />
                  ) : (
                    <span
                      className="p-badge p-component p-badge-dot p-badge-secondary"
                      style={{
                        border: '1px solid #2196F3',
                        background: 'white',
                      }}
                    />
                  )}
                </div>
              )}
            />
            <Column field="name" header={t('PARTNER_NAME')} />
            <Column field="agent_id" header={t('PARTNER_ID')} />
            {mode === 'edit' && (
              <Column
                header={t('ACTIONS')}
                body={(rowData) => (
                  <Button
                    className="p-button-danger"
                    icon="pi pi-trash"
                    onClick={() => {
                      setProjectPartners(
                        projectPartners.filter(
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
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="partners-grid">{t('GRID_ID')}</label>
            <InputText
              id="partners-grid"
              type="text"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="grid-partner-org-name">
              {t('SEARCH_GRID_WITH_ORG_NAME')}
            </label>
            <InputText
              id="grid-partner-org-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-3">
            <Button
              label={t('ADD_PARTNER')}
              icon="pi pi-plus"
              className="p-mt-2 p-mb-2"
              onClick={() => {
                setProjectPartners(
                  projectPartners
                    .filter((item) => item.agent_id !== agentId)
                    .concat({
                      name,
                      agent_id: agentId,
                      is_leader: false,
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

export default ProjectPartners;
