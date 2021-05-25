import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const sampleCollections = [
  { id: 1, name: 'Collection A', resources: 3, averageScoring: 3.5 },
  { id: 2, name: 'Collection B', resources: 4, averageScoring: 2.3 },
  { id: 4, name: 'Collection C', resources: 8, averageScoring: 5.1 },
];

const CollectionsTable = () => {
  const { t } = useTranslation();

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
    <DataTable value={sampleCollections} className="p-mt-2">
      <Column field="name" body={nameTemplate} />
      <Column field="resources" body={resourcesTemplate} />
      <Column field="averageScoring" body={averageScoringTemplate} />
      <Column
        body={(rowData) => (
          <div className="p-text-right">
            <Button
              icon="pi pi-pencil"
              className="p-button-icon-only p-button-rounded p-mr-2"
            />
            <Button
              icon="pi pi-eye"
              className="p-button-icon-only p-button-rounded p-button-secondary p-mr-2"
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default CollectionsTable;
