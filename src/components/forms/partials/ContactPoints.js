import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const contactPointTypes = [
  { label: 'Individual', value: 'individual' },
  { label: 'Organisation', value: 'group/organisation' },
];

const ContactPoints = ({ contactPoints, setContactPoints, mode }) => {
  const { t } = useTranslation();
  const [type, setType] = useState('');
  const [agentId, setAgentId] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <DataTable
            header={t('CONTACT_POINTS')}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={contactPoints}
            className="p-mt-4"
          >
            <Column field="agent_type" header={t('CONTACT_POINT_TYPE')} />
            <Column field="name" header={t('CONTACT_POINT_NAME')} />
            <Column field="agent_id" header={t('ID')} />
            {mode === 'edit' && (
              <Column
                header={t('ACTIONS')}
                body={(rowData) => (
                  <Button
                    className="p-button-danger"
                    icon="pi pi-trash"
                    onClick={() => {
                      setContactPoints(
                        contactPoints.filter(
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
            <label htmlFor="contactPointType">{t('CONTACT_POINT_TYPE')}</label>
            <Dropdown
              options={contactPointTypes}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="contactPointName">{t('CONTACT_POINT_NAME')}</label>
            <InputText
              id="contactPointName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="contactPointId">{t('CONTACT_POINT_ID')}</label>
            <InputText
              id="contactPointId"
              type="text"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              required
            />
          </div>
          <div className="p-field p-col-12 p-md-3">
            <Button
              label={t('ADD_CONTACT_POINT')}
              icon="pi pi-plus"
              className="p-mt-2 p-mb-2"
              onClick={() => {
                setContactPoints(
                  contactPoints
                    .filter((item) => item.agent_id !== agentId)
                    .concat({
                      agent_type: type,
                      agent_id: agentId,
                      name,
                    })
                );
                setName('');
                setType('');
                setAgentId('');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPoints;
