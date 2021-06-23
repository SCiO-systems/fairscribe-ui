import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getSharedTeams } from '../../services/teams';
import { UserContext } from '../../store';
import { useDebounce } from '../../utilities/hooks';

const SharedTeamsTable = ({
  teamDialogOpen,
  setTeamDialogOpen,
  setViewTeam,
  setInviteMembersDialogOpen,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedGlobalFilter = useDebounce(globalFilter, 300);
  const [sharedTeams, setSharedTeams] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const { id } = useContext(UserContext);
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
    onFilter();
  }, [debouncedGlobalFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);
    getSharedTeams(id, lazyParams.page + 1).then(({ data, meta }) => {
      setSharedTeams(data);
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
    const sharedTeamsFiltered = sharedTeams.filter((m) => {
      const name = m.name.toLowerCase();
      return name.includes(f.toLowerCase());
    });
    setSharedTeams(sharedTeamsFiltered);
  };

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0">{t('SHARED_TEAMS')}</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          className="p-mr-3"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={t('SEARCH_FOR_TEAMS')}
        />
      </span>
    </div>
  );

  const nameTemplate = (rowData) => <h5>{rowData.name}</h5>;

  const tasksTemplate = (rowData) => (
    // TODO: Should be rowData.activeTasks
    <span>
      <strong>{0}</strong>
      <br />
      {t('ACTIVE_TASKS')}
    </span>
  );

  const reviewsTemplate = (rowData) => (
    // TODO: Should be rowData.pendingReviewTasks
    <span>
      <strong>{0}</strong>
      <br />
      {t('PENDING_REVIEWS')}
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
      value={sharedTeams}
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
        body={(rowData) => (
          <div className="p-d-flex p-flex-row p-ai-center p-jc-end p-flex-wrap">
            <Button
              label={t('VIEW_DETAILS')}
              icon="pi pi-eye"
              onClick={() => history.push(`/teams/${rowData.id}`)}
              className="p-button-secondary p-mb-1"
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default SharedTeamsTable;
