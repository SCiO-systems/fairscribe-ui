import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { getResources } from '../../services/teams';
import { useDebounce } from '../../utilities/hooks';
import FairScoreMiniChart from '../charts/FairScoreMini';
import DeleteResourceDialog from '../dialogs/DeleteResourceDialog';
import UploadToRepoDialog from '../dialogs/UploadToRepoDialog';
import PIIStatusTemplate from '../forms/partials/PIIStatusTemplate';

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

const deletableStatuses = ['under_preparation', 'under_review', 'draft'];

const ResourcesTable = ({ type, title, setTaskFormOpen, team: teamId }) => {
  const { t } = useTranslation();

  const history = useHistory();
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedGlobalFilter = useDebounce(globalFilter, 300);
  const [uploadToRepoDialogOpen, setUploadToRepoDialog] = useState(false);
  const [deleteResourceDialogOpen, setDeleteResourceDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
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

  const { data, isLoading, isFetching } = useQuery(['resources', teamId, status], () =>
    getResources(teamId, status)
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
      </div>
    </div>
  );

  const titleTemplate = ({ title: resourceTitle }) => <strong>{resourceTitle || 'N/A'}</strong>;

  const collectionsTemplate = ({ collections_count: count }) => (
    <span>{t('IN_X_COLLECTIONS', { count })}</span>
  );

  const piiStatusTemplate = ({ pii_check: piiCheck }) => <PIIStatusTemplate status={piiCheck} />;

  const fairScoringTemplate = (rowData) => (
    <div>
      <FairScoreMiniChart resourceId={rowData?.id} data={fairScoreTransformer(rowData)} />
    </div>
  );

  const formatDate = (rowData) => {
    const d = new Date(rowData.created_at);
    return `${d.getDate()}/${d.getUTCMonth() + 1}/${d.getFullYear()}`;
  };

  const resourceLink = (tId, resourceId, mode) =>
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
        value={data?.data || []}
        className="p-mt-2"
        loading={isFetching || isLoading}
        ref={dt}
      >
        <Column sortable field="created_at" header={t('ISSUE_DATE')} body={formatDate} />
        <Column sortable field="title" body={titleTemplate} header={t('TITLE')} />
        <Column sortable field="type" header={t('TYPE')} />
        <Column sortable field="subtype" header={t('SUBTYPE')} />
        <Column sortable field="collections" body={collectionsTemplate} header={t('COLLECTIONS')} />
        <Column sortable field="piiStatus" body={piiStatusTemplate} header={t('PII_STATUS')} />
        <Column sortable field="fairScore" body={fairScoringTemplate} header={t('FAIR_SCORING')} />
        <Column
          body={(rowData) => (
            <div className="p-text-right">
              {rowData.status === 'approved' && (
                <Button
                  icon="pi pi-upload"
                  className="p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
                  onClick={() => {
                    setSelectedResource(rowData);
                    setUploadToRepoDialog(true);
                  }}
                />
              )}
              {rowData?.status === 'under_preparation' && (
                <Button
                  title="Edit resource"
                  icon="pi pi-pencil"
                  onClick={() => history.push(resourceLink(teamId, rowData.id, 'edit'))}
                  className="p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
                />
              )}
              {rowData?.status === 'published' && (
                <Button
                  title="View resource"
                  icon="pi pi-eye"
                  onClick={() => history.push(resourceLink(teamId, rowData.id, 'view'))}
                  className="p-button-icon-only p-button-rounded p-button-secondary p-mr-2 p-mb-2"
                />
              )}
              {rowData?.status === 'under_review' && (
                <Button
                  title="Review resource"
                  icon="pi pi-eye"
                  onClick={() => history.push(resourceLink(teamId, rowData.id, 'review'))}
                  className="p-button-icon-only p-button-rounded p-button-secondary p-mr-2 p-mb-2"
                />
              )}
              {deletableStatuses?.includes(rowData?.status) && (
                <Button
                  title="Delete resource"
                  icon="pi pi-trash"
                  onClick={() => {
                    setSelectedResource(rowData);
                    setDeleteResourceDialogOpen(true);
                  }}
                  className="p-button-icon-only p-button-rounded p-button-danger p-mr-2 p-mb-2"
                />
              )}
            </div>
          )}
        />
      </DataTable>
      <UploadToRepoDialog
        dialogOpen={uploadToRepoDialogOpen}
        setDialogOpen={setUploadToRepoDialog}
        resourceId={selectedResource?.id}
        teamId={teamId}
        onFilter={onFilter}
      />
      <DeleteResourceDialog
        dialogOpen={deleteResourceDialogOpen}
        setDialogOpen={setDeleteResourceDialogOpen}
        resource={selectedResource}
        teamId={teamId}
        onSuccess={() => {
          queryClient.invalidateQueries(['resources', teamId, status]);
        }}
      />
    </>
  );
};

export default ResourcesTable;
