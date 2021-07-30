import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ResourceRelatedResources = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [dois, setDois] = useState(initialData.related_resources || []);
  const [doi, setDoi] = useState('');

  const removeDoi = (id) => {
    setDois(dois.filter((d) => d.id !== id));
  };

  const addDoi = () => {
    const newDois = [...dois, { id: doi }];
    setDois(newDois);
    setDoi('');
    setter(newDois);
  };

  useEffect(
    () => setter(dois),
    [dois] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const doiFooterTemplate = mode === 'edit' && (
    <div className="p-formgrid p-grid p-fluid">
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
          <Button label={t('ADD')} onClick={addDoi} />
        </div>
      </div>
    </div>
  );

  return (
    <Fieldset
      legend={t('PROJECT_RELATED_RESOURCES')}
      style={{ position: 'relative' }}
      className="relative p-mb-4"
    >
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <DataTable
              emptyMessage={t('NO_ENTRIES_FOUND')}
              value={dois}
              footer={doiFooterTemplate}
              className="p-mt-4"
            >
              <Column field="id" header="DOI" body={({ id }) => id} />
              <Column
                body={({ id }) => (
                  <div className="p-text-right">
                    <Button
                      onClick={() => removeDoi(id)}
                      className="p-button-danger"
                      icon="pi pi-trash"
                    />
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceRelatedResources;
