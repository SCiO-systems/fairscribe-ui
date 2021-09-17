import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PublishingInformation = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [dois, setDois] = useState(
    initialData?.identifier?.filter((item) => item?.type === 'DOI') || []
  );
  const [urls, setUrls] = useState(
    initialData?.identifier?.filter((item) => item.type === 'URL') || []
  );
  const [doi, setDoi] = useState('');
  const [url, setUrl] = useState('');

  const addDoi = () => {
    const newDois = [...dois, { type: 'DOI', value: doi }];
    setDois(newDois);
    setDoi('');
  };

  const removeItem = (value, type) => {
    if (type === 'DOI') {
      setDois(dois.filter((item) => item.value !== value));
    }
    if (type === 'URL') {
      setUrls(urls.filter((item) => item.value !== value));
    }
  };

  const addUrl = () => {
    const newUrls = [...urls, { type: 'URL', value: url }];
    setUrls(newUrls);
    setUrl('');
  };

  useEffect(() => {
    setter([...dois, ...urls]);
  }, [dois, urls]); // eslint-disable-line react-hooks/exhaustive-deps

  const doiFooterTemplate = mode === 'edit' && (
    <form
      className="p-formgrid p-grid p-fluid"
      onSubmit={(e) => {
        e.preventDefault();
        addDoi();
      }}
    >
      <div className="p-col-10">
        <div className="p-field">
          <InputText
            name="doi"
            value={doi}
            type="text"
            onChange={(e) => setDoi(e.target.value)}
          />
        </div>
      </div>
      <div className="p-col-2">
        <div className="p-field">
          <Button label={t('ADD')} type="submit" />
        </div>
      </div>
    </form>
  );

  const hdlFooterTemplate = mode === 'edit' && (
    <form
      className="p-formgrid p-grid p-fluid"
      onSubmit={(e) => {
        e.preventDefault();
        addUrl();
      }}
    >
      <div className="p-col-10">
        <div className="p-field">
          <InputText
            name="url"
            value={url}
            type="text"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
      <div className="p-col-2">
        <div className="p-field">
          <Button label={t('ADD')} type="submit" />
        </div>
      </div>
    </form>
  );

  return (
    <Fieldset
      legend={t('PUBLISHING_INFORMATION')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <DataTable
        header={t('DOIS')}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={dois}
        className="p-mt-4"
        footer={doiFooterTemplate}
      >
        <Column field="value" header={t('DOI_TITLE')} />
        <Column field="verified" header={t('VERIFIED')} body={() => '-'} />
        <Column
          field="publisher"
          header={t('PUBLISHER_TITLE')}
          body={() => '-'}
        />
        {mode === 'edit' && (
          <Column
            body={({ value, type }) => (
              <div className="p-text-right">
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => removeItem(value, type)}
                />
              </div>
            )}
          />
        )}
      </DataTable>
      <DataTable
        header={t('HDLS_URLS')}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={urls}
        className="p-mt-4"
        footer={hdlFooterTemplate}
      >
        <Column field="value" header={t('HDL_URL')} />
        <Column
          field="verified"
          header={t('VERIFIED')}
          body={(_rowData) => '-'}
        />
        {mode === 'edit' && (
          <Column
            body={(rowData) => (
              <div className="p-text-right">
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => removeItem(rowData.value, rowData.type)}
                />
              </div>
            )}
          />
        )}
      </DataTable>
      {initialData.type && initialData.type.value === 'document' && (
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
      )}
    </Fieldset>
  );
};

export default PublishingInformation;
