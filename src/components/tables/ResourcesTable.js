import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FairScoreMiniChart from '../charts/FairScoreMini';

const sampleResources = [
  {
    id: 1,
    issueDate: '16/03/2021',
    title:
      'Gene action controlling normalized difference vegetation index in crosses of elite maize (Zea mays L.) inbred lines',
    type: 'Scientific Publication',
    collections: 4,
    piiStatus: 'Certified',
    fairScore: [
      {
        category: 'R',
        cat: 'Reusable',
        value: 3.35,
        full: 5,
      },
      {
        category: 'I',
        cat: 'Interoperable',
        value: 3.7,
        full: 5,
      },
      {
        category: 'A',
        cat: 'Accessible',
        value: 3.47,
        full: 5,
      },
      {
        category: 'F',
        cat: 'Findable',
        value: 2.89,
        full: 5,
      },
    ],
  },
  {
    id: 2,
    issueDate: '05/01/2021',
    title:
      'Quantifying potential economic benefits of blast-resistant biofortified wheat in Bangladesh: The case of BARI Gom 33',
    type: 'Dataset',
    collections: 3,
    piiStatus: 'Certified',
    fairScore: [
      {
        category: 'R',
        cat: 'Reusable',
        value: 3.35,
        full: 5,
      },
      {
        category: 'I',
        cat: 'Interoperable',
        value: 3.7,
        full: 5,
      },
      {
        category: 'A',
        cat: 'Accessible',
        value: 3.47,
        full: 5,
      },
      {
        category: 'F',
        cat: 'Findable',
        value: 2.89,
        full: 5,
      },
    ],
  },
];

const ResourcesTable = () => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState('');

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0">{t('TEAM_RESOURCES')}</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={t('SEARCH_FOR_RESOURCES')}
        />
      </span>
    </div>
  );

  const titleTemplate = (rowData) => <strong>{rowData.title}</strong>;

  const collectionsTemplate = (rowData) => (
    <span>{t('IN_X_COLLECTIONS', { count: rowData.collections })}</span>
  );

  const piiStatusTemplate = (rowData) => (
    <div className="p-d-flex p-jc-start p-ai-center">
      <FontAwesomeIcon className="p-mr-3" icon={faCertificate} size="2x" />
      {t('CERTIFIED')}
    </div>
  );

  const fairScoringTemplate = (rowData) => (
    <FairScoreMiniChart resourceId={rowData.id} data={rowData.fairScore} />
  );

  return (
    <DataTable
      header={tableHeader}
      globalFilter={filter}
      paginator
      rows={10}
      emptyMessage="No resources were found."
      value={sampleResources}
      className="p-mt-2"
    >
      <Column sortable field="issueDate" header={t('ISSUE_DATE')} />
      <Column sortable field="title" body={titleTemplate} header={t('TITLE')} />
      <Column sortable field="type" header={t('TYPE')} />
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

export default ResourcesTable;
