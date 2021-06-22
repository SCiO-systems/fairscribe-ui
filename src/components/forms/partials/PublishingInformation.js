import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import React from 'react';
import { useTranslation } from 'react-i18next';

const sampleDOIs = [
  {
    id: 1,
    DOI: 'Test',
    verified: true,
    publisher: 'Publisher',
  },
];

const sampleHDLs = [
  {
    id: 1,
    hdlUrl: 'http://test.local',
    verified: true,
    publisher: 'Publisher',
  },
  {
    id: 2,
    hdlUrl: 'http://invalid.local',
    verified: false,
    publisher: 'Publisher',
  },
];

const PublishingInformation = () => {
  const { t } = useTranslation();

  // eslint-disable-next-line
  const booleanTemplate = (bool) =>
    bool ? <i className="pi pi-check" /> : <i className="pi pi-times" />;

  const doiFooterTemplate = (
    <div className="p-formgroup-inline">
      <div className="p-field">
        <InputText type="text" />
      </div>
      <Button label={t('ADD')} className="p-mr-2 p-mb-2" />
      <Button label={t('GET_DOI')} className="p-mr-2 p-mb-2" />
    </div>
  );

  const hdlFooterTemplate = (
    <div className="p-formgroup-inline">
      <div className="p-field">
        <InputText type="text" />
      </div>
      <Button label={t('ADD')} className="p-mr-2 p-mb-2" />
    </div>
  );

  return (
    <Fieldset
      legend={t('PUBLISHING_INFORMATION')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <Button
        style={{ position: 'absolute', top: '-0.6rem', right: '1.4rem' }}
        label={t('CHECK_FAIR')}
      />
      <DataTable
        header={t('DOIS')}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={sampleDOIs}
        className="p-mt-4"
        footer={doiFooterTemplate}
      >
        <Column field="DOI" header={t('DOI_TITLE')} />
        <Column
          field="verified"
          header={t('VERIFIED')}
          body={(rowData) => booleanTemplate(rowData.verified)}
        />
        <Column field="publisher" header={t('PUBLISHER_TITLE')} />
      </DataTable>
      <DataTable
        header={t('HDLS_URLS')}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={sampleHDLs}
        className="p-mt-4"
        footer={hdlFooterTemplate}
      >
        <Column field="hdlUrl" header={t('HDL_URL')} />
        <Column
          field="verified"
          header={t('VERIFIED')}
          body={(rowData) => booleanTemplate(rowData.verified)}
        />
        <Column field="publisher" header={t('PUBLISHER_TITLE')} />
      </DataTable>
      <div className="p-mt-4 p-fluid p-formgrid p-grid">
        <div className="p-field p-col-6">
          <label htmlFor="ArXiv">ArXiv:</label>
          <InputText id="ArXiv" type="text" />
        </div>
        <div className="p-field p-col-6">
          <label htmlFor="ISBN">ISBN:</label>
          <InputText id="ISBN" type="text" />
        </div>
        <div className="p-field p-col-6">
          <label htmlFor="ISSN">ISSN:</label>
          <InputText id="ISSN" type="text" />
        </div>
        <div className="p-field p-col-6">
          <label htmlFor="eISSN">eISSN:</label>
          <InputText id="eISSN" type="text" />
        </div>
      </div>
    </Fieldset>
  );
};

export default PublishingInformation;
