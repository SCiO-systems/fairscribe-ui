import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const authorTypes = [
  { label: 'Individual', value: 'individual' },
  { label: 'Organisation', value: 'group/organisation' },
];

const AuthorsTable = ({ header, className, authors, setAuthors }) => {
  const { t } = useTranslation();
  const [type, setType] = useState('');
  const [agentId, setAgentId] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-col-12">
          <DataTable
            header={header}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={authors}
            className={classNames([className])}
          >
            <Column header={t('AUTHOR_TYPE')} field="agent_type" />
            <Column header={t('AUTHOR_NAME')} field="name" />
            <Column header={t('AUTHOR_ID')} field="agent_id" />
            <Column
              className="p-text-right"
              body={(rowData) => (
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => {
                    setAuthors(
                      authors.filter(
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
            options={authorTypes}
            onChange={(e) => setType(e.value)}
          />
        </div>
        <div className="p-col-2 p-text-right">
          <Button
            label={t('COLLECTION_TITLE_ADD')}
            icon="pi pi-plus"
            className="p-button-sm p-component"
            onClick={() => {
              setAuthors(
                authors.concat({
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
  );
};

export default AuthorsTable;
