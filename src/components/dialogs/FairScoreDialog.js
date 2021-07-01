import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const data = {
  findable: {
    score: 3.5,
    rows: [
      {
        category: 'findable',
        metadata: '"resource has DOI"',
        scoring: 1,
        recommendation: 'Get a DOI for the resource',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata: 'if ( "no DOI exist" ) then "resource has an HDL or URL"',
        scoring: 0.125,
        recommendation:
          'if no DOI exist, add or update metadata record with HDL or URL after publishing it',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata: '"resource has TITLE"',
        scoring: 0.125,
        recommendation: 'Provide a Resource Title',
        checker: (metadataRecord) => {
          let score = 0;
          let result = 'no';
          if (metadataRecord.title && metadataRecord.title.length > 0) {
            score = 0.125;
            result = 'yes';
          }
          return { result, score };
        },
      },
      {
        category: 'findable',
        metadata: '"resource has DESCRIPTION"',
        scoring: 0.5,
        recommendation: 'Provide a Resource Description',
        checker: (metadataRecord) => {
          let score = 0;
          let result = 'no';
          if (
            metadataRecord.description &&
            metadataRecord.description.length > 0
          ) {
            score = 0.5;
            result = 'yes';
          }
          return { result, score };
        },
      },
      {
        category: 'findable',
        metadata: '"resource has AUTHORS"',
        scoring: 0.125,
        recommendation: 'Define the Resource Authors',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata: '"AUTHORS have ORCIDs or GRIDids"',
        scoring: 0.5,
        recommendation:
          'Use ORCIDs for individuals and/or GRIDids for organisations',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata: '"resource has ISSUED DATE"',
        scoring: 0.25,
        recommendation: 'Provide the Issued Date of the resource',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata:
          '"resource uses controlled values (from vocabularies, thesauri, ontologies)  as Keywords"',
        scoring: 'MIN(1, 0.25*#TERMS)',
        recommendation:
          'Use at least 4 controlled values to describe the resource',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata:
          'if ( "no controlled values exist" ) then "resource has Keyword Terms"',
        scoring: 'MIN(0.25, 0.0625*#TERMS)',
        recommendation:
          'if no controlled value  is used then provide at least 4 keywords to describe the resource',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata:
          '"spatial coverage is defined as vocabulary (ISO 3166-2) terms"',
        scoring: 0.5,
        recommendation: 'Define the spatial coverage of the resource',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata: '"spatial coverage is defined as geopolygons"',
        scoring: 0.5,
        recommendation: 'Define the spatial coverage of the resource',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'findable',
        metadata: 'METADATA registered or indexed in a searchable resource',
        scoring: 0.5,
        recommendation:
          'Publish metadata in a CGIAR Center Repository or GARDIAN',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
    ],
  },
  accessible: {
    score: 2.5,
    rows: [
      {
        category: 'accessible',
        metadata: '"resource has Licence / Terms of Use specified"',
        scoring: 1,
        recommendation: 'Specify the  Licence / Terms of Use of the resource',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'accessible',
        metadata: '"use Open Source or CC0 or CC BY license"',
        scoring: 2,
        recommendation: 'Use Licence wizard to select appropriate license',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'accessible',
        metadata: '"use any other standard license"',
        scoring: 1,
        recommendation: 'Use Licence wizard to select appropriate license',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'accessible',
        metadata: 'Provide URLs of physical files',
        scoring: 1.5,
        recommendation: 'Provide physical files or relevant URLs',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'accessible',
        metadata:
          'METADATA accessible even when the data are no longer available',
        scoring: 0.5,
        recommendation:
          'Publish metadata in a CGIAR Center Repository or GARDIAN',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
    ],
  },
  interopable: {
    score: 2.8,
    rows: [
      {
        category: 'interoperable',
        metadata:
          'Make use ONLY of domain-relevant community open formats/standards',
        scoring: 2,
        recommendation: 'Avoid when possible proprietary formats',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'interoperable',
        metadata:
          'if not then use proprietary formats, accepted by Certified Trusted Data Repository',
        scoring: 0.5,
        recommendation: 'Avoid when possible proprietary formats',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'interoperable',
        metadata:
          'The data included in the resource are annotated and/or carry a legend clarifying their meaning',
        scoring: 1,
        recommendation: 'Produce an annotated version of the described dataset',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'interoperable',
        metadata:
          'The annotations are built using controlled values (defined in a vocabulary, thesaurus or ontology)',
        scoring: 1,
        recommendation:
          'Use conttrolled values for annotating the data included in the dataset',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'interoperable',
        metadata: 'DATA is additionaly linked to other data to provide context',
        scoring: 0.5,
        recommendation:
          'Provide in Metadata links from datasets to relevant publications or vice versa',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'interoperable',
        metadata:
          'Metadata use a formal, accessible, shared, and broadly applicable language for knowledge representation',
        scoring: 0.5,
        recommendation: 'Publish metadata in a CG-Core conformant repository',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
    ],
  },
  reusable: {
    score: 3.2,
    rows: [
      {
        category: 'reusable',
        metadata:
          'The resource complies with basic Personal Information Protection principles ',
        scoring: 2,
        recommendation:
          'Run the PII check service and accordingly handle the reported PII issues',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'reusable',
        metadata: '"use Open Source or CC0 or CC BY license"',
        scoring: 1,
        recommendation: 'Use Licence wizard to select appropriate license',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'reusable',
        metadata: '"use CC BY NC"',
        scoring: 0.5,
        recommendation: 'Use Licence wizard to select appropriate license',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
      {
        category: 'reusable',
        metadata:
          'The Reusability of a resource  is directly linked to its Findability, Accessibility and Interoperability qualities',
        scoring: 'max 2 points calculated as (F + A + I) /7.5',
        recommendation:
          'Improve Findability, Accessibility and / or Interoperability',
        checker: (metadataRecord) => ({ result: 'no', score: 0 }),
      },
    ],
  },
};

const FairScoreDialog = ({ dialogOpen, setDialogOpen, metadataRecord }) => {
  const { t } = useTranslation();
  const [findableScore, setFindableScore] = useState(0);
  const [accessibleScore, setAccessibleScore] = useState(0);
  const [interoperableScore, setInteroperableScore] = useState(0);
  const [reusableScore, setReusableScore] = useState(0);

  useEffect(() => {
    setFindableScore(
      data.findable.rows.reduce(
        (score, r) => score + r.checker(metadataRecord).score,
        0
      )
    );
    setAccessibleScore(0);
    setInteroperableScore(0);
    setReusableScore(0);
  }, [metadataRecord]);

  const meetsConditionTemplate = (rowData) => (
    <div className="p-text-center">
      {rowData.checker(metadataRecord).result === 'yes' && (
        <i className="pi pi-check" />
      )}
      {rowData.checker(metadataRecord).result === 'no' && (
        <i className="pi pi-times" />
      )}
      {rowData.checker(metadataRecord).result === 'partially' &&
        'partially fullfilled'}
    </div>
  );

  const rowClass = (rd) => ({
    'meets-condition': rd.checker(metadataRecord).result === 'yes',
  });

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
            className="fairscore-dt p-mt-2"
            dataKey="metadata"
            value={data.findable.rows}
            rowGroupMode="rowspan"
            sortField="category"
            rowClassName={rowClass}
            showGridlines
          >
            <Column
              field="category"
              rowSpan={data.findable.rows.length}
              body={() => (
                <div className="p-text-center">
                  <strong style={{ fontSize: '1.8rem' }}>
                    {t('FINDABLE')}
                    <br />({findableScore})
                  </strong>
                </div>
              )}
            />
            <Column
              rowSpan={1}
              field="metadata"
              header={t('METADATA_PROPERTY_CONDITION')}
            />
            <Column
              rowSpan={1}
              style={{ textAlign: 'center' }}
              field="scoring"
              header={t('SCORING_IN_FAIR')}
            />
            <Column
              className="result"
              body={meetsConditionTemplate}
              rowSpan={1}
              header={t('RESOURCE_MEETS_CONDITION')}
            />
            <Column
              rowSpan={1}
              field="recommendation"
              header={t('RECOMMENDATION')}
            />
          </DataTable>
          <DataTable
            className="fairscore-dt"
            dataKey="metadata"
            value={data.accessible.rows}
            rowGroupMode="rowspan"
            sortField="category"
            rowClassName={rowClass}
            showGridlines
          >
            <Column
              field="category"
              headerStyle={{ display: 'none' }}
              rowSpan={data.accessible.rows.length}
              body={() => (
                <div className="p-text-center">
                  <strong style={{ fontSize: '1.8rem' }}>
                    {t('ACCESSIBLE')}
                    <br />({accessibleScore})
                  </strong>
                </div>
              )}
            />
            <Column headerStyle={{ display: 'none' }} field="metadata" />
            <Column
              headerStyle={{ display: 'none' }}
              style={{ textAlign: 'center' }}
              field="scoring"
            />
            <Column
              className="result"
              headerStyle={{ display: 'none' }}
              body={meetsConditionTemplate}
            />
            <Column headerStyle={{ display: 'none' }} field="recommendation" />
          </DataTable>
          <DataTable
            className="fairscore-dt"
            dataKey="metadata"
            value={data.interopable.rows}
            rowGroupMode="rowspan"
            sortField="category"
            rowClassName={rowClass}
            showGridlines
          >
            <Column
              field="category"
              headerStyle={{ display: 'none' }}
              rowSpan={data.interopable.rows.length}
              body={() => (
                <div className="p-text-center">
                  <strong style={{ fontSize: '1.8rem' }}>
                    {t('INTEROPERABLE')}
                    <br />({interoperableScore})
                  </strong>
                </div>
              )}
            />
            <Column headerStyle={{ display: 'none' }} field="metadata" />
            <Column
              headerStyle={{ display: 'none' }}
              style={{ textAlign: 'center' }}
              field="scoring"
            />
            <Column
              className="result"
              headerStyle={{ display: 'none' }}
              body={meetsConditionTemplate}
            />
            <Column headerStyle={{ display: 'none' }} field="recommendation" />
          </DataTable>
          <DataTable
            className="fairscore-dt"
            dataKey="metadata"
            value={data.reusable.rows}
            rowGroupMode="rowspan"
            sortField="category"
            rowClassName={rowClass}
            showGridlines
          >
            <Column
              field="category"
              headerStyle={{ display: 'none' }}
              rowSpan={data.reusable.rows.length}
              body={() => (
                <div className="p-text-center">
                  <strong style={{ fontSize: '1.8rem' }}>
                    {t('REUSABLE')}
                    <br />({reusableScore})
                  </strong>
                </div>
              )}
            />
            <Column headerStyle={{ display: 'none' }} field="metadata" />
            <Column
              headerStyle={{ display: 'none' }}
              style={{ textAlign: 'center' }}
              field="scoring"
            />
            <Column
              className="result"
              headerStyle={{ display: 'none' }}
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
