import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollectionDialog from '../dialogs/CollectionDialog';
import ResourcesTable from './ResourcesTable';

const sampleCollections = [
  { id: 1, name: 'Collection A', resources: 3, averageScoring: 3.5 },
  { id: 2, name: 'Collection B', resources: 4, averageScoring: 2.3 },
  { id: 4, name: 'Collection C', resources: 8, averageScoring: 5.1 },
];

const demoCollection = {
  titles: [
    { language: 'English', title: 'Title' },
    { language: 'French', title: 'Title 2' },
    { language: 'Spanish', title: 'Title 3' },
  ],
  descriptions: [
    {
      language: 'English',
      description: 'This is a long description of something.',
    },
    {
      language: 'French',
      description: 'This is a longer description of something else.',
    },
    {
      language: 'Spanish',
      description:
        'This is an even longer description of something entirely different.',
    },
  ],
};

const CollectionsTable = () => {
  const { t } = useTranslation();

  const [newCollectionDialogOpen, setNewCollectionDialogOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState(null);
  const [editCollectionDialogOpen, setEditCollectionDialogOpen] =
    useState(false);
  const [filter, setFilter] = useState('');
  const [rows, setRows] = useState(10);

  const rowExpansionTemplate = (data) => <ResourcesTable />;

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
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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

  const nameTemplate = (rowData) => <strong>{rowData.name}</strong>;

  const resourcesTemplate = (rowData) => (
    <span>
      <strong>{rowData.resources}</strong>
      <br />
      {t('RESOURCES')}
    </span>
  );

  const averageScoringTemplate = (rowData) => (
    <span>
      <strong>{rowData.averageScoring}</strong>
      <br />
      {t('AVERAGE_FAIR_SCORING')}
    </span>
  );

  return (
    <>
      <DataTable
        header={tableHeader}
        globalFilter={filter}
        paginator
        rows={rows}
        dataKey="id"
        expandedRows={expandedRows}
        rowExpansionTemplate={rowExpansionTemplate}
        rowsPerPageOptions={[10, 20, 50]}
        value={sampleCollections}
        onPage={(event) => setRows(event.rows)}
        className="p-mt-2"
      >
        <Column
          sortable
          field="name"
          header={t('COLLECTION_NAME')}
          body={nameTemplate}
        />
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
            <div className="p-text-right">
              <Button
                icon="pi pi-pencil"
                className="p-button-icon-only p-button-rounded p-mr-3"
                onClick={() => setEditCollectionDialogOpen(true)}
              />
              <Button
                icon={
                  expandedRows && expandedRows[rowData.id]
                    ? 'pi pi-eye-slash'
                    : 'pi pi-eye'
                }
                label={
                  expandedRows && expandedRows[rowData.id]
                    ? t('HIDE_COLLECTION_RESOURCES')
                    : t('VIEW_COLLECTION_RESOURCES')
                }
                className="p-button-secondary"
                onClick={() => toggleExpandRow(rowData.id)}
              />
            </div>
          )}
        />
      </DataTable>
      <CollectionDialog
        dialogOpen={newCollectionDialogOpen}
        setDialogOpen={setNewCollectionDialogOpen}
      />
      <CollectionDialog
        dialogOpen={editCollectionDialogOpen}
        setDialogOpen={setEditCollectionDialogOpen}
        collection={demoCollection}
      />
    </>
  );
};

export default CollectionsTable;
