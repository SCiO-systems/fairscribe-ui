import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const demoAuthors = [
  {
    type: 'author',
    name: 'John Doe',
    id: 'orcid:1234-5678-91011',
  },
  {
    type: 'author',
    name: 'Jane Doe',
    id: 'orcid:1234-5678-91011',
  },
  {
    type: 'organization',
    name: 'CGiar',
    id: 'id:1234-5678',
  },
];

const authorTypes = ['Individual', 'Organization'];

const AuthorsTable = ({
  resourceAuthors,
  header,
  className,
  onDeleteItem,
  onAddItem,
}) => {
  const { t } = useTranslation();
  const [authors, setAuthors] = useState(resourceAuthors || []);
  const [type, setType] = useState('');
  const [details, setDetails] = useState({});

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-col-12">
          <DataTable
            header={header}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={demoAuthors}
            dataKey="id"
            className={classNames([className])}
          >
            <Column header={t('AUTHOR_TYPE')} field="type" />
            <Column header={t('AUTHOR_NAME')} field="name" />
            <Column header={t('AUTHOR_ID')} field="id" />
            <Column
              className="p-text-right"
              body={(rowData) => (
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => onDeleteItem(rowData.lang)}
                />
              )}
            />
          </DataTable>
        </div>
      </div>
      <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
        <div className="p-col-10">
          <Dropdown
            id="authorType"
            value={type}
            options={authorTypes}
            onChange={(e) => setType(e.value)}
          />
        </div>
        <div className="p-col-2 p-text-right">
          <Button
            label={t('COLLECTION_TITLE_ADD')}
            icon="pi pi-plus"
            className="p-button-sm p-component"
            onClick={() => {}}
          />
        </div>
      </div>
      {type.toLowerCase() === 'individual' && (
        <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
          <div className="p-col-12 p-field">
            <label htmlFor="orcid">{t('ORCID')}</label>
            <InputText
              id="orcid"
              value={details && details.orcid}
              onChange={(e) => setDetails({ ...details, orcid: e.value })}
            />
          </div>
          <div className="p-col-12 p-field">
            <label htmlFor="firstname">{t('FIRSTNAME')}</label>
            <InputText
              id="firstname"
              value={details && details.firstname}
              onChange={(e) => setDetails({ ...details, firstname: e.value })}
            />
          </div>
          <div className="p-col-12 p-field">
            <label htmlFor="lastname">{t('LASTNAME')}</label>
            <InputText
              id="lastname"
              value={details && details.lastname}
              onChange={(e) => setDetails({ ...details, lastname: e.value })}
            />
          </div>
          <div className="p-col-12 p-field">
            <label htmlFor="email">{t('EMAIL')}</label>
            <InputText
              id="email"
              value={details && details.email}
              onChange={(e) => setDetails({ ...details, email: e.value })}
            />
          </div>
        </div>
      )}
      {type.toLowerCase() === 'organization' && (
        <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
          <div className="p-col-12 p-field">
            <label htmlFor="gridid">{t('GRID_ID')}</label>
            <InputText
              id="gridid"
              value={details && details.gridid}
              onChange={(e) => setDetails({ ...details, gridid: e.value })}
            />
          </div>
          <div className="p-col-12 p-field">
            <label htmlFor="name">{t('NAME')}</label>
            <InputText
              id="name"
              value={details && details.name}
              onChange={(e) => setDetails({ ...details, name: e.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorsTable;
