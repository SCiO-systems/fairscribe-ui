import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const demoPartners = [
  {
    leader: true,
    name: 'Centro Internacional de Agricultura Tropical',
    id: 'grid.499882.6',
  },
  {
    leader: false,
    name: 'Centro Internacional de Agricultura Tropical',
    id: 'grid.499882.6',
  },
];

const ProjectPartners = ({ projectPartners }) => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState(projectPartners || demoPartners);
  const [partner, setPartner] = useState({});

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <DataTable
            header={t('PROJECT_PARTNERS')}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={partners}
            className="p-mt-4"
          >
            <Column
              field="leader"
              header={t('LEADER')}
              body={({ leader }) => (
                <div className="p-text-left">
                  {leader ? (
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
            <Column
              field="name"
              header={t('PARTNER_NAME')}
              body={({ name }) => name}
            />
            <Column field="id" header={t('PARTNER_ID')} body={({ id }) => id} />
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
            value={partner.id}
            onChange={(e) => setPartner({ id: e.target.value })}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="orgName">{t('SEARCH_GRID_WITH_ORG_NAME')}</label>
          <InputText
            id="orgName"
            type="text"
            value={partner.name}
            onChange={(e) => setPartner({ name: e.target.value })}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-3">
          <Button
            label={t('ADD_PARTNER')}
            icon="pi pi-plus"
            className="p-mt-2 p-mb-2"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPartners;
