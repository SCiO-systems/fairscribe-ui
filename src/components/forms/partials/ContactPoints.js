import { Button } from 'primereact/button';
import { Column, DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const demoContacts = [
  {
    type: 'Individual',
    name: 'John Doe',
    id: 'grid.028734.2',
  },
  {
    type: 'Organization',
    name: 'International Food Policy Research Institue',
    id: 'grid.22231.2',
  },
];

const types = [
  { label: 'Individual', value: 1 },
  { label: 'Organization', value: 2 },
];

const ContactPoints = ({ projectContactPoints }) => {
  const { t } = useTranslation();
  const [contactPoints, setContactPoints] = useState(
    projectContactPoints || demoContacts,
  );
  const [contactPoint, setContactPoint] = useState({});

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
            <Column
              field="type"
              header={t('CONTACT_POINT_TYPE')}
              body={({ type }) => type}
            />
            <Column
              field="name"
              header={t('CONTACT_POINT_NAME')}
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
          <label htmlFor="contactPointType">{t('CONTACT_POINT_TYPE')}</label>
          <Dropdown
            options={types}
            value={contactPoint.type}
            onChange={(e) => setContactPoint({ type: e.target.value })}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="contactPointName">{t('CONTACT_POINT_NAME')}</label>
          <InputText
            id="contactPointName"
            type="text"
            value={contactPoint.name}
            onChange={(e) => setContactPoint({ name: e.target.value })}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="contactPointId">{t('CONTACT_POINT_ID')}</label>
          <InputText
            id="contactPointId"
            type="text"
            value={contactPoint.id}
            onChange={(e) => setContactPoint({ id: e.target.value })}
            required
          />
        </div>
        <div className="p-field p-col-12 p-md-3">
          <Button
            label={t('ADD_CONTACT_POINT')}
            icon="pi pi-plus"
            className="p-mt-2 p-mb-2"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPoints;
