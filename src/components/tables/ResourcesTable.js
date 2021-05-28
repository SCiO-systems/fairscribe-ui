import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
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

const ResourcesTable = ({ type, title, setTaskFormOpen }) => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState('');
  const [unpublished, setUnpublished] = useState(true);
  const [rows, setRows] = useState(10);

  const tableHeader = (
    <div className="p-d-flex p-flex-row p-jc-between p-ai-center">
      <h4 className="p-my-0 p-text-uppercase">{title}</h4>
      <div className="p-d-flex p-flex-row p-ai-center">
        <span className="p-input-icon-left p-mr-3">
          <i className="pi pi-search" />
          <InputText
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
      rows={rows}
      rowsPerPageOptions={[10, 20, 50]}
      onPage={(event) => setRows(event.rows)}
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
