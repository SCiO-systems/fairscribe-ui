import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateDoi } from '../../../services/dois';
import { ToastContext } from '../../../store/index';
import { handleError } from '../../../utilities/errors';

const DOIs = ({ mode, title, dois, setDois }) => {
  const { t } = useTranslation();
  const { setError } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [doi, setDoi] = useState('');

  const verifyAndAddDoi = async () => {
    setIsLoading(true);
    try {
      const response = await validateDoi(doi, title);
      setDois([{ ...response }]);
      setDoi('');
    } catch (error) {
      setError(handleError(error));
    }
    setIsLoading(false);
  };

  const doiFooterTemplate = mode === 'edit' && dois?.length === 0 && (
    <form
      className="p-formgrid p-grid p-fluid"
      onSubmit={(e) => {
        e.preventDefault();
        verifyAndAddDoi();
      }}
    >
      <div className="p-col-10">
        <div className="p-field">
          <InputText
            name="doi"
            disabled={isLoading}
            placeholder="Enter digital object identifier (DOI)"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
          />
        </div>
      </div>
      <div className="p-col-2">
        <div className="p-field">
          <Button loading={isLoading} disabled={doi === ''} label={t('ADD')} type="submit" />
        </div>
      </div>
    </form>
  );

  const verifiedTemplate = (rowData) => (
    <div className="p-text-left">
      {rowData.matchesTitle ? (
        <i
          className="pi pi-check text-green bg-green rounded-full p-p-1"
          style={{ fontSize: '1rem' }}
        />
      ) : (
        <div className="p-d-flex p-ai-center">
          <i
            className="pi pi-times text-red bg-red rounded-full p-p-1"
            style={{ fontSize: '1rem' }}
          />
          <span className="text-red p-ml-2 text-xs">Does not match resource title.</span>
        </div>
      )}
    </div>
  );

  return (
    <DataTable emptyMessage="" value={dois} footer={doiFooterTemplate} className="p-mb-4">
      <Column field="value" header={t('DOI_TITLE')} />
      <Column field="verified" header={t('VERIFIED')} body={verifiedTemplate} />
      <Column
        field="provider"
        header={t('DOI_SERVICE_PROVIDER')}
        body={(rowData) => {
          if (rowData.provider === 'datacite') {
            return <span>DataCite</span>;
          }
          if (rowData.provider === 'crossref') {
            return <span>Crossref</span>;
          }
          return <span>N/A</span>;
        }}
      />
      {mode === 'edit' && (
        <Column
          body={({ value }) => (
            <div className="p-text-right">
              <Button
                className="p-button-danger"
                icon="pi pi-trash"
                onClick={() => setDois(dois.filter((d) => d.value !== value))}
              />
            </div>
          )}
        />
      )}
    </DataTable>
  );
};

export default DOIs;
