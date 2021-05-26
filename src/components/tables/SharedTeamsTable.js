import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const sharedTeams = [
  { name: 'CSI Team', tasks: '4', reviews: '13' },
  { name: 'Org Data Team', tasks: '9', reviews: '6' },
];

const SharedTeamsTable = () => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState('');

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0">{t('SHARED_TEAMS')}</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={t('SEARCH_FOR_TEAMS')}
        />
      </span>
    </div>
  );

  const nameTemplate = (rowData) => <h5>{rowData.name}</h5>;

  const tasksTemplate = (rowData) => (
    <span>
      <strong>{rowData.tasks}</strong>
      <br />
      {t('ACTIVE_TASKS')}
    </span>
  );

  const reviewsTemplate = (rowData) => (
    <span>
      <strong>{rowData.reviews}</strong>
      <br />
      {t('PENDING_REVIEWS')}
    </span>
  );

  return (
    <DataTable
      header={tableHeader}
      globalFilter={filter}
      rows={10}
      paginator
      emptyMessage="No teams were found."
      value={sharedTeams}
      className="p-mt-2"
    >
      <Column sortable field="name" header={t('NAME')} body={nameTemplate} />
      <Column
        sortable
        field="tasks"
        header={t('ACTIVE_TASKS')}
        body={tasksTemplate}
      />
      <Column
        field="reviews"
        sortable
        header={t('PENDING_REVIEWS')}
        body={reviewsTemplate}
      />
      <Column header="" />
      <Column
        body={(rowData) => (
          <div className="p-text-right">
            <Button
              label={t('VIEW_DETAILS')}
              icon="pi pi-eye"
              className="p-button-secondary"
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default SharedTeamsTable;
