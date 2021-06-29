import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { getResources } from '../../services/teams';
import FairScoreMiniChart from '../charts/FairScoreMini';
import FairScoreDialog from '../dialogs/FairScoreDialog';
import UploadToRepoDialog from '../dialogs/UploadToRepoDialog';
import { useDebounce } from '../../utilities/hooks';

const fairScoreTransformer = (data) => [
  {
    category: 'R',
    cat: 'Reusable',
    value: data.reusable_score,
    full: 5,
  },
  {
    category: 'I',
    cat: 'Interoperable',
    value: data.interoperable_score,
    full: 5,
  },
  {
    category: 'A',
    cat: 'Accessible',
    value: data.accessible_score,
    full: 5,
  },
  {
    category: 'F',
    cat: 'Findable',
    value: data.findable_score,
    full: 5,
  },
];

const ResourcesTable = ({ type, title, setTaskFormOpen, team: teamId }) => {
  const { t } = useTranslation();

  const history = useHistory();
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedGlobalFilter = useDebounce(globalFilter, 300);
  const [unpublished, setUnpublished] = useState(true);
  const [uploadToRepoDialogOpen, setUploadToRepoDialog] = useState(false);
  const [fairScoreDialogOpen, setFairScoreDialogOpen] = useState(false);
  const dt = useRef(null);
  const [lazyParams, setLazyParams] = useState({
    first: 1,
    rows: 15,
    page: 0,
  });

  let status = '';
  switch (type) {
    case 'tasks':
      status = 'under_preparation';
      break;
    case 'reviews':
      status = 'under_review';
      break;
    case 'unpublished':
      status = 'approved';
      break;
    case 'resources':
    case undefined:
    default:
      status = 'published';
  }

  useEffect(() => {
    onFilter();
  }, [debouncedGlobalFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data, isLoading, isFetching } = useQuery(
    ['resources', teamId, status],
    () => getResources(teamId, status)
  );

  const queryClient = useQueryClient();

  const onPage = (event) => {
    const lp = { ...lazyParams, ...event };
    setGlobalFilter('');
    setLazyParams(lp);
  };

  const onFilter = () => {
    const f = debouncedGlobalFilter.toLowerCase();
    if (f === '') {
      queryClient.invalidateQueries(['resources', teamId, status]);
      return;
    }
    data.data.filter((r) => {
      const searchable = r.title.toLowerCase();
      return searchable.includes(f.toLowerCase());
    });
  };

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0 p-text-uppercase">{title}</h4>
      <div className="p-d-flex p-flex-row p-ai-center">
        <span className="p-input-icon-left p-mr-3">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={t('SEARCH_FOR_RESOURCES')}
          />
        </span>
        {type === 'tasks' && (
          <Button
            onClick={() => setTaskFormOpen(true)}
            label={t('CREATE_NEW_TASK')}
            icon="pi pi-plus"
          />
        )}
        {type === 'unpublished' && (
          <span className="p-d-flex p-flex-row p-ai-center">
            <InputSwitch
              id="published"
              className="p-my-0 p-py-0 p-mr-2"
              checked={unpublished}
              onChange={(e) => setUnpublished(e.value)}
            />
            <label htmlFor="published" style={{ minWidth: '90px' }}>
              {unpublished ? t('UNPUBLISHED') : t('PUBLISHED')}
            </label>
          </span>
        )}
      </div>
    </div>
  );

  const titleTemplate = (rowData) => <strong>{rowData.title}</strong>;

  const collectionsTemplate = (rowData) => (
    <span>{t('IN_X_COLLECTIONS', { count: rowData.collections_count })}</span>
  );

  const piiStatusTemplate = (rowData) => (
    <div className="p-d-flex p-jc-start p-ai-center">
      <FontAwesomeIcon className="p-mr-3" icon={faCertificate} size="2x" />
      {rowData.pii_status === 'passed' ? t('CERTIFIED') : t('PENDING')}
    </div>
  );

  const fairScoringTemplate = (rowData) => (
    <div>
      <FairScoreMiniChart
        resourceId={rowData.id}
        data={fairScoreTransformer(rowData)}
      />
    </div>
  );

  const formatDate = (rowData) => {
    const d = new Date(rowData.created_at);
    return `${d.getDate()}/${d.getUTCMonth() + 1}/${d.getFullYear()}`;
  };

  const editResourceLink = (tId, resourceId, mode) =>
    `/teams/${tId}/resources/${resourceId}/mode/${mode}`;

  return (
    <>
      <DataTable
        header={tableHeader}
        paginator
        lazy
        rows={lazyParams.rows}
        first={lazyParams.first}
        onPage={onPage}
        emptyMessage="No resources were found."
        value={data ? data.data : []}
        className="p-mt-2"
        loading={isFetching || isLoading}
        ref={dt}
      >
        <Column
          sortable
          field="created_at"
          header={t('ISSUE_DATE')}
          body={formatDate}
        />
        <Column
          sortable
          field="title"
          body={titleTemplate}
          header={t('TITLE')}
        />
        <Column
          sortable
          field="type"
          header={t('TYPE')}
          style={{ textTransform: 'uppercase' }}
        />
        <Column
          sortable
          field="collections"
          body={collectionsTemplate}
          header={t('COLLECTIONS')}
        />
        <Column
          sortable
          field="piiStatus"
          body={piiStatusTemplate}
          header={t('PII_STATUS')}
        />
        <Column
          sortable
          field="fairScore"
          body={fairScoringTemplate}
          header={t('FAIR_SCORING')}
        />
        <Column
          body={(rowData) => (
            <div className="p-text-right">
              {type === 'unpublished' ? (
                <Button
                  icon="pi pi-upload"
                  className="p-button-icon-only p-button-rounded p-mr-2"
                  onClick={() => setUploadToRepoDialog(true)}
                />
              ) : (
                <Button
                  icon="pi pi-pencil"
                  onClick={() =>
                    history.push(editResourceLink(teamId, rowData.id, 'edit'))
                  }
                  className="p-button-icon-only p-button-rounded p-mr-2"
                />
              )}
              <Button
                icon="pi pi-eye"
                className="p-button-icon-only p-button-rounded p-button-secondary p-mr-2"
              />
            </div>
          )}
        />
      </DataTable>
      <UploadToRepoDialog
        dialogOpen={uploadToRepoDialogOpen}
        setDialogOpen={setUploadToRepoDialog}
      />
      <FairScoreDialog
        dialogOpen={fairScoreDialogOpen}
        setDialogOpen={setFairScoreDialogOpen}
      />
    </>
  );
};

export default ResourcesTable;
