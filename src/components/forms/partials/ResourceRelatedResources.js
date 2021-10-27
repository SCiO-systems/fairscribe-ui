import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateDoi } from '../../../services/dois';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';

const ResourceRelatedResources = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const { setError } = useContext(ToastContext);
  const [dois, setDois] = useState(initialData.related_resources || []);
  const [isLoading, setIsLoading] = useState(false);
  const [doi, setDoi] = useState('');

  const removeDoi = (id) => {
    setDois(dois.filter(({ DOI }) => DOI !== id));
  };

  const verifyAndAddDoi = async () => {
    setIsLoading(true);
    try {
      const { value } = await validateDoi(doi, '');
      setDois(dois.filter(({ DOI }) => DOI !== value).concat({ DOI: value }));
      setDoi('');
    } catch (error) {
      setError(handleError(error));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setter(dois);
  }, [dois]); // eslint-disable-line react-hooks/exhaustive-deps

  const doiFooterTemplate = mode === 'edit' && (
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
            value={doi}
            type="text"
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
    <div className="p-d-flex p-jc-start p-ai-center">
      <i
        className="pi pi-check text-green bg-green rounded-full p-p-1"
        style={{ fontSize: '1rem' }}
      />
    </div>
  );

  return (
    <Fieldset id="resource-related-resources" legend={t('RELATED_RESOURCES')} className="p-mb-4">
      <DataTable emptyMessage={t('NO_ENTRIES_FOUND')} value={dois} footer={doiFooterTemplate}>
        <Column header="DOI" body={({ DOI }) => DOI} />
        <Column field="verified" header={t('VERIFIED')} body={verifiedTemplate} />
        <Column
          body={({ DOI }) => (
            <div className="p-text-right">
              <Button
                onClick={() => removeDoi(DOI)}
                className="p-button-danger"
                icon="pi pi-trash"
              />
            </div>
          )}
        />
      </DataTable>
    </Fieldset>
  );
};

export default ResourceRelatedResources;
