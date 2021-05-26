import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollectionDialog from '../dialogs/CollectionDialog';

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

  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0">{t('TEAM_COLLECTIONS')}</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-mr-3"
          placeholder={t('SEARCH_FOR_COLLECTIONS')}
        />
        <Button
          onClick={() => setCollectionDialogOpen(true)}
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
        rows={10}
        value={sampleCollections}
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
                className="p-button-icon-only p-button-rounded p-mr-2"
                onClick={() => setCollectionDialogOpen(true)}
              />
              <Button
                icon="pi pi-eye"
                className="p-button-icon-only p-button-rounded p-button-secondary p-mr-2"
              />
            </div>
          )}
        />
      </DataTable>
      <CollectionDialog
        dialogOpen={collectionDialogOpen}
        setDialogOpen={setCollectionDialogOpen}
        collection={demoCollection}
      />
    </>
  );
};

export default CollectionsTable;
