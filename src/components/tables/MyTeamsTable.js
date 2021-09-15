import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getOwnedTeams } from '../../services/teams';
import { UserContext } from '../../store';
import { useDebounce } from '../../utilities/hooks';

const MyTeamsTable = ({
  teamDialogOpen,
  setTeamDialogOpen,
  setViewTeam,
  setInviteMembersDialogOpen,
  deleteTeamDialogOpen,
  setDeleteTeamDialogOpen,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedGlobalFilter = useDebounce(globalFilter, 300);
  const [myTeams, setMyTeams] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const { id: userId } = useContext(UserContext);
  const history = useHistory();
  const dt = useRef(null);
  const [lazyParams, setLazyParams] = useState({
    first: 1,
    rows: 15,
    page: 0,
  });

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // essentially reload teams table when the teamDialog closes
    if (teamDialogOpen === false) {
      loadLazyData();
    }
    if (deleteTeamDialogOpen === false) {
      loadLazyData();
    }
  }, [teamDialogOpen, deleteTeamDialogOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onFilter();
  }, [debouncedGlobalFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);
    getOwnedTeams(userId, lazyParams.page + 1).then(({ data, meta }) => {
      setMyTeams(data);
      setTotalRecords(meta.total);
      setLoading(false);
    });
  };

  const onPage = (event) => {
    const lp = { ...lazyParams, ...event };
    setGlobalFilter('');
    setLazyParams(lp);
  };

  const onFilter = () => {
    const f = debouncedGlobalFilter.toLowerCase();
    if (f === '') {
      loadLazyData();
      return;
    }
    const myTeamsFiltered = myTeams.filter((m) => {
      const name = m.name.toLowerCase();
      return name.includes(f.toLowerCase());
    });
    setMyTeams(myTeamsFiltered);
  };

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0">{t('MY_TEAMS')}</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          className="p-mr-3"
          onChange={(e) => setGlobalFilter(e.target.value)}
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
      <strong>{rowData.active_tasks}</strong>
      <br />
      {t('ACTIVE_TASKS')}
    </span>
  );

  const reviewsTemplate = (rowData) => (
    <span>
      <strong>{rowData.pending_review_tasks}</strong>
      <br />
      {t('PENDING_REVIEWS')}
    </span>
  );

  const uploadsTemplate = (rowData) => (
    <span>
      <strong>{rowData.pending_upload_tasks}</strong>
      <br />
      {t('PENDING_UPLOADS')}
    </span>
  );

  return (
    <DataTable
      header={tableHeader}
      paginator
      lazy
      rows={lazyParams.rows}
      first={lazyParams.first}
      onPage={onPage}
      totalRecords={totalRecords}
      emptyMessage="No teams were found."
      value={myTeams}
      className="p-mt-2"
      loading={loading}
      ref={dt}
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
        body={({ id, name, description }) => (
          <div className="p-d-flex p-flex-row p-ai-center p-jc-start p-flex-wrap">
            <Button
              onClick={() => {
                setViewTeam({ id, name, description });
                setInviteMembersDialogOpen(true);
              }}
              icon="pi pi-user-plus"
              className="p-button-outlined p-button-icon-only p-button-rounded p-mb-2 p-mr-2"
            />
            <Button
              icon="pi pi-cog"
              onClick={() => {
                setViewTeam({ id, name, description });
                setTeamDialogOpen(true);
              }}
              className="p-button-outlined p-button-icon-only p-button-rounded p-button-secondary p-mb-2 p-mr-2"
            />
            <Button
              icon="pi pi-eye"
              onClick={() => history.push(`/teams/${id}`)}
              className="p-button-outlined p-button-icon-only p-button-rounded p-button-secondary p-mb-2 p-mr-2"
            />
            <Button
              icon="pi pi-trash"
              onClick={() => {
                setViewTeam({ id, name, description });
                setDeleteTeamDialogOpen(true);
              }}
              className="p-button-outlined p-button-icon-only p-button-rounded p-button-danger p-mb-2"
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default MyTeamsTable;
