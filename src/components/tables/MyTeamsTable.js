import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const myTeams = [{ name: 'EiA', tasks: '4', reviews: '13', uploads: '21' }];

const MyTeamsTable = ({
  setTeamDialogOpen,
  setViewTeam,
  setInviteMembersDialogOpen,
}) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('');
  const [rows, setRows] = useState(10);
  const history = useHistory();

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0">{t('MY_TEAMS')}</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filter}
          className="p-mr-3"
          onChange={(e) => setFilter(e.target.value)}
          placeholder={t('SEARCH_FOR_TEAMS')}
        />
        <Button
          label={t('CREATE_TEAM')}
          icon="pi pi-plus-circle"
          onClick={() => {
            setViewTeam(null);
            setTeamDialogOpen(true);
          }}
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

  const uploadsTemplate = (rowData) => (
    <span>
      <strong>{rowData.uploads}</strong>
      <br />
      {t('PENDING_UPLOADS')}
    </span>
  );

  return (
    <DataTable
      header={tableHeader}
      globalFilter={filter}
      paginator
      rows={rows}
      rowsPerPageOptions={[10, 20, 50]}
      onPage={(event) => setRows(event.rows)}
      emptyMessage="No teams were found."
      value={myTeams}
      className="p-mt-2"
    >
      <Column field="name" header={t('NAME')} body={nameTemplate} />
      <Column field="tasks" header={t('ACTIVE_TASKS')} body={tasksTemplate} />
      <Column
        field="reviews"
        header={t('PENDING_REVIEWS')}
        body={reviewsTemplate}
      />
      <Column
        field="uploads"
        header={t('PENDING_UPLOADS')}
        body={uploadsTemplate}
      />
      <Column
        body={(rowData) => (
          <div className="p-d-flex p-flex-row p-ai-center p-jc-end p-flex-wrap">
            <Button
              onClick={() => setInviteMembersDialogOpen(true)}
              icon="pi pi-user-plus"
              className="p-button-outlined p-button-icon-only p-button-rounded p-mb-1 p-mr-2"
            />
            <Button
              icon="pi pi-cog"
              onClick={() => {
                setViewTeam({
                  name: 'EiA',
                  description: 'My sample description',
                });
                setTeamDialogOpen(true);
              }}
              className="p-button-outlined p-button-icon-only p-button-rounded p-button-secondary p-mb-1 p-mr-2"
            />
            <Button
              label={t('VIEW_DETAILS')}
              icon="pi pi-eye"
              onClick={() => history.push('/teams/1')}
              className="p-button-secondary p-mb-1"
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default MyTeamsTable;
