import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { useTranslation } from 'react-i18next';

const data = {
  findable: {
    score: 3.5,
    rows: [
      {
        metadata: 'resource has DOI',
        score: 1,
        meets_condition: 'no',
        recommendation: 'Get a DOI for the resource',
      },
      {
        metadata: 'resource has DOI',
        score: 1,
        meets_condition: 'no',
        recommendation: 'Get a DOI for the resource',
      },
      {
        metadata: 'resource has DOI',
        score: 1,
        meets_condition: 'yes',
        recommendation: 'Get a DOI for the resource',
      },
      {
        metadata: 'resource has DOI',
        score: 1,
        meets_condition: 'no',
        recommendation: 'Get a DOI for the resource',
      },
      {
        metadata: 'resource has DOI',
        score: 1,
        meets_condition: 'no',
        recommendation: 'Get a DOI for the resource',
      },
      {
        metadata: 'resource has DOI',
        score: 1,
        meets_condition: 'no',
        recommendation: 'Get a DOI for the resource',
      },
    ],
  },
  accessible: {
    score: 2.5,
    rows: [
      {
        metadata: 'Provide URLs of physical files',
        score: 1.5,
        meets_condition: 'yes',
        recommendation: 'Provide physical files or relevant URLs',
      },
      {
        metadata: 'Provide URLs of physical files',
        score: 1.5,
        meets_condition: 'no',
        recommendation: 'Provide physical files or relevant URLs',
      },
      {
        metadata: 'Provide URLs of physical files',
        score: 1.5,
        meets_condition: 'no',
        recommendation: 'Provide physical files or relevant URLs',
      },
      {
        metadata: 'Provide URLs of physical files',
        score: 1.5,
        meets_condition: 'no',
        recommendation: 'Provide physical files or relevant URLs',
      },
      {
        metadata: 'Provide URLs of physical files',
        score: 1.5,
        meets_condition: 'no',
        recommendation: 'Provide physical files or relevant URLs',
      },
    ],
  },
  interopable: {
    score: 2.8,
    rows: [
      {
        metadata:
          'DATA is additionally linked to other data to provide context',
        score: 0.5,
        meets_condition: 'partially',
        recommendation: 'Provide metadata links from datasets',
      },
      {
        metadata:
          'DATA is additionally linked to other data to provide context',
        score: 0.5,
        meets_condition: 'no',
        recommendation: 'Provide metadata links from datasets',
      },
      {
        metadata:
          'DATA is additionally linked to other data to provide context',
        score: 0.5,
        meets_condition: 'no',
        recommendation: 'Provide metadata links from datasets',
      },
    ],
  },
  reusable: {
    score: 3.2,
    rows: [
      {
        metadata: 'use CC BY NC',
        score: 0.5,
        meets_condition: 'no',
        recommendation: 'Use License Wizard to select appropriate license',
      },
      {
        metadata: 'use CC BY NC',
        score: 0.5,
        meets_condition: 'yes',
        recommendation: 'Use License Wizard to select appropriate license',
      },
    ],
  },
};

const FairScoreDialog = ({ dialogOpen, setDialogOpen }) => {
  const { t } = useTranslation();

  const meetsConditionTemplate = (rowData) => (
    <div className="p-text-center">
      {rowData.meets_condition === 'yes' && <i className="pi pi-check" />}
      {rowData.meets_condition === 'no' && <i className="pi pi-times" />}
      {rowData.meets_condition === 'partially' && 'partially fullfilled'}
    </div>
  );

  return (
    <Dialog
      header={t('FAIR_SCORING')}
      visible={dialogOpen}
      style={{ maxWidth: '90%' }}
      maximized
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-fluid">
        <div className="p-col-12 p-text-center">
          <DataTable
            dataKey="metadata"
            value={data.findable.rows}
            className="p-mt-2"
            rowGroupMode="rowspan"
          >
            <Column
              rowSpan={2}
              body={() => (
                <div className="p-text-center">
                  <strong>
                    {t('FINDABLE')}
                    <br />({data.findable.score})
                  </strong>
                </div>
              )}
            />
            <Column
              field="metadata"
              header={t('METADATA_PROPERTY_CONDITION')}
            />
            <Column
              style={{ textAlign: 'center' }}
              field="score"
              header={t('SCORING_IN_FAIR')}
            />
            <Column
              field="meets_condition"
              body={meetsConditionTemplate}
              header={t('RESOURCE_MEETS_CONDITION')}
            />
            <Column field="recommendation" header={t('RECOMMENDATION')} />
          </DataTable>
          <DataTable
            dataKey="metadata"
            value={data.accessible.rows}
            rowGroupMode="rowspan"
          >
            <Column
              headerStyle={{ display: 'none' }}
              rowSpan={2}
              body={() => (
                <div className="p-text-center">
                  <strong>
                    {t('ACCESSIBLE')}
                    <br />({data.accessible.score})
                  </strong>
                </div>
              )}
            />
            <Column headerStyle={{ display: 'none' }} field="metadata" />
            <Column
              headerStyle={{ display: 'none' }}
              style={{ textAlign: 'center' }}
              field="score"
            />
            <Column
              headerStyle={{ display: 'none' }}
              field="meets_condition"
              body={meetsConditionTemplate}
            />
            <Column headerStyle={{ display: 'none' }} field="recommendation" />
          </DataTable>
          <DataTable
            dataKey="metadata"
            value={data.interopable.rows}
            rowGroupMode="rowspan"
          >
            <Column
              headerStyle={{ display: 'none' }}
              rowSpan={2}
              body={() => (
                <div className="p-text-center">
                  <strong>
                    {t('INTEROPERABLE')}
                    <br />({data.interopable.score})
                  </strong>
                </div>
              )}
            />
            <Column headerStyle={{ display: 'none' }} field="metadata" />
            <Column
              headerStyle={{ display: 'none' }}
              style={{ textAlign: 'center' }}
              field="score"
            />
            <Column
              headerStyle={{ display: 'none' }}
              field="meets_condition"
              body={meetsConditionTemplate}
            />
            <Column headerStyle={{ display: 'none' }} field="recommendation" />
          </DataTable>
          <DataTable
            dataKey="metadata"
            value={data.reusable.rows}
            rowGroupMode="rowspan"
          >
            <Column
              headerStyle={{ display: 'none' }}
              rowSpan={2}
              body={() => (
                <div className="p-text-center">
                  <strong>
                    {t('REUSABLE')}
                    <br />({data.reusable.score})
                  </strong>
                </div>
              )}
            />
            <Column headerStyle={{ display: 'none' }} field="metadata" />
            <Column
              headerStyle={{ display: 'none' }}
              style={{ textAlign: 'center' }}
              field="score"
            />
            <Column
              headerStyle={{ display: 'none' }}
              field="meets_condition"
              body={meetsConditionTemplate}
            />
            <Column headerStyle={{ display: 'none' }} field="recommendation" />
          </DataTable>
        </div>
      </div>
    </Dialog>
  );
};

export default FairScoreDialog;
