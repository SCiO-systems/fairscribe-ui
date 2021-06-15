import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import placeholderImage from '../../../assets/img/placeholder.png';

const sampleFiles = [
  {
    id: 1,
    fileName: 'testfile.pdf',
    extension: 'pdf',
    mime: 'application/pdf',
    type: 'PDF',
    piiStatus: 'OK',
    isAnnotated: true,
    extractKeywords: false,
    extractCoverage: true,
  },
];

const ResourceFiles = () => {
  const userImage = useRef(null);
  const { t } = useTranslation();

  // eslint-disable-next-line
  const booleanTemplate = (bool) =>
    bool ? <i className="pi pi-check" /> : <i className="pi pi-times" />;

  return (
    <Fieldset
      legend={t('RESOURCE_FILES')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <Button
        style={{ position: 'absolute', top: '-0.6rem', right: '1.4rem' }}
        label={t('CHECK_FAIR')}
      />
      <div>
        <img
          src={placeholderImage}
          height="127px"
          className="rounded"
          alt="Resource Thumbnail"
        />
        <br />
        <Button
          label={t('UPLOAD_THUMBNAIL')}
          icon="pi pi-image"
          className="p-mt-2 p-mb-2"
          onClick={() => {
            userImage.current.click();
          }}
        />
      </div>
      <form>
        <input
          type="file"
          id="file"
          ref={userImage}
          style={{ display: 'none' }}
        />
      </form>
      <DataTable
        header={t('PHYSICAL_FILES')}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={sampleFiles}
        className="p-mt-4"
        showGridlines
      >
        <Column field="fileName" header={t('FILE_NAME')} />
        <Column field="extension" header={t('EXTENSION')} />
        <Column field="mime" header={t('MIME_TYPE')} />
        <Column field="type" header={t('FILE_DATA_TYPE')} />
        <Column field="piiStatus" header={t('PII_STATUS')} />
        <Column
          field="isAnnotated"
          header={t('IS_ANNOTATED')}
          body={(rowData) => booleanTemplate(rowData.isAnnotated)}
        />
        <Column
          field="extractKeywords"
          header={t('USE_TO_EXTRACT_KEYWORDS')}
          body={(rowData) => booleanTemplate(rowData.extractKeywords)}
        />
        <Column
          field="extractCoverage"
          header={t('USE_TO_EXTRACT_COVERAGE')}
          body={(rowData) => booleanTemplate(rowData.extractCoverage)}
        />
      </DataTable>
      <br />
      <Button label={t('UPLOAD_FILES')} icon="pi pi-upload" />
    </Fieldset>
  );
};

export default ResourceFiles;
