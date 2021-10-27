import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTeamCollections } from '../../services/collections';
import { UserContext } from '../../store';
import { useDebounce } from '../../utilities/hooks';
import CurrentCollectionDialog from '../dialogs/CurrentCollectionDialog';
import DeleteCollectionDialog from '../dialogs/DeleteCollectionDialog';
import ResourcesTable from './ResourcesTable';

const CollectionsTable = ({ team }) => {
  const { t } = useTranslation();
  const { ownTeams } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedGlobalFilter = useDebounce(globalFilter, 300);
  const [collections, setCollections] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [newCollectionDialogOpen, setNewCollectionDialogOpen] = useState(false);
  const [deleteCollectionDialogOpen, setDeleteCollectionDialogOpen] = useState(false);
  const [editCollectionDialogOpen, setEditCollectionDialogOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const dt = useRef(null);
  const [lazyParams, setLazyParams] = useState({
    first: 1,
    rows: 15,
    page: 0,
  });

  // The user owns this team.
  const ownedTeam = ownTeams.filter(({ id }) => id === team.id).length === 1;

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload the the collections when the new collections dialog closes.
  useEffect(() => {
    // essentially reload teams table when the teamDialog closes
    if (newCollectionDialogOpen === false) {
      loadLazyData();
    }
  }, [newCollectionDialogOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload the collections when the delete collection dialog closes.
  useEffect(() => {
    // essentially reload teams table when the teamDialog closes
    if (deleteCollectionDialogOpen === false) {
      loadLazyData();
    }
  }, [deleteCollectionDialogOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload the collections when the edit collections dialog closes.
  useEffect(() => {
    // essentially reload teams table when the teamDialog closes
    if (editCollectionDialogOpen === false) {
      loadLazyData();
    }
  }, [editCollectionDialogOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onFilter();
  }, [debouncedGlobalFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = async () => {
    setLoading(true);
    try {
      const { data, meta } = await getTeamCollections(team.id, lazyParams.page + 1);
      setCollections(data);
      setTotalRecords(meta.total);
    } catch (e) {
      setCollections([]);
      setTotalRecords(0);
      // TODO: Handle the exception here.
      console.error(e); // eslint-disable-line
    }
    setLoading(false);
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
    const collectionsFiltered = collections.filter((m) => {
      const title = m.title.toLowerCase();
      return title.includes(f.toLowerCase());
    });
    setCollections(collectionsFiltered);
  };

  const rowExpansionTemplate = (teamId, collectionId) => (
    <ResourcesTable team={teamId} collectionId={collectionId} />
  );

  const toggleExpandRow = (id) => {
    const exp = expandedRows == null ? [] : [...expandedRows];
    if (exp[id]) {
      delete exp[id];
    } else {
      exp[id] = true;
    }
    setExpandedRows(exp);
  };

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0 p-text-uppercase">{t('TEAM_COLLECTIONS')}</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-mr-3"
          placeholder={t('SEARCH_FOR_COLLECTIONS')}
        />
        <Button
          onClick={() => setNewCollectionDialogOpen(true)}
          label={t('CREATE_NEW_COLLECTION')}
          icon="pi pi-plus"
        />
      </span>
    </div>
  );

  const titleTemplate = (rowData) => <strong>{rowData.title}</strong>;

  const resourcesTemplate = (rowData) => (
    <span>
      <strong>{`${rowData.resources_count}`}</strong>
      <br />
      {t('RESOURCES')}
    </span>
  );

  const averageScoringTemplate = (rowData) => (
    <span>
      <strong>{`${rowData.fair_scoring}`}</strong>
      <br />
      {t('AVERAGE_FAIR_SCORING')}
    </span>
  );

  return (
    <>
      <DataTable
        header={tableHeader}
        paginator
        lazy
        rows={lazyParams.rows}
        first={lazyParams.first}
        onPage={onPage}
        totalRecords={totalRecords}
        dataKey="id"
        expandedRows={expandedRows}
        rowExpansionTemplate={(rowData) => rowExpansionTemplate(team.id, rowData.id)}
        emptyMessage="No collections were found."
        value={collections}
        className="p-mt-2"
        loading={loading}
        ref={dt}
      >
        <Column sortable field="title" header={t('COLLECTION_TITLE')} body={titleTemplate} />
        <Column
          sortable
          field="resources"
          header={t('COLLECTION_RESOURCES')}
          body={resourcesTemplate}
        />
        <Column
          sortable
          field="averageScoring"
          header={t('COLLECTION_FAIR_SCORING')}
          body={averageScoringTemplate}
        />
        <Column
          body={(rowData) => (
            <div className="p-d-flex p-ai-center p-jc-end p-flex-wrap">
              <Button
                icon="pi pi-pencil"
                className="p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
                title="Edit collection"
                onClick={() => {
                  setSelectedCollection(rowData);
                  setEditCollectionDialogOpen(true);
                }}
              />
              <Button
                icon={expandedRows && expandedRows[rowData.id] ? 'pi pi-eye-slash' : 'pi pi-eye'}
                title="View collection resources"
                className="p-button-secondary p-button-icon-only p-button-rounded p-mr-2 p-mb-2"
                onClick={() => toggleExpandRow(rowData.id)}
              />
              {ownedTeam && (
                <Button
                  icon="pi pi-trash"
                  title="Delete collection"
                  onClick={() => {
                    setSelectedCollection(rowData);
                    setDeleteCollectionDialogOpen(true);
                  }}
                  className="p-button-icon-only p-button-rounded p-button-danger p-mr-2 p-mb-2"
                />
              )}
            </div>
          )}
        />
      </DataTable>
      <CurrentCollectionDialog
        dialogOpen={newCollectionDialogOpen}
        setDialogOpen={setNewCollectionDialogOpen}
        team={team}
      />
      <CurrentCollectionDialog
        dialogOpen={editCollectionDialogOpen}
        setDialogOpen={setEditCollectionDialogOpen}
        collection={selectedCollection}
        team={team}
      />
      <DeleteCollectionDialog
        dialogOpen={deleteCollectionDialogOpen}
        setDialogOpen={setDeleteCollectionDialogOpen}
        team={team}
        collection={selectedCollection}
      />
    </>
  );
};

export default CollectionsTable;
