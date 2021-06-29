import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ResourceRelatedResources = ({ initialData, setter }) => {
  const { t } = useTranslation();
  const [dois, setDois] = useState(initialData.related_resources || []);
  const [doi, setDoi] = useState('');

  const addDoi = () => {
    const newDois = [...dois, { id: doi }];
    setDois(newDois);
    setDoi('');
    // Notify the parent to update the big JSON
    setter(newDois);
  };

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <DataTable
            header={t('PROJECT_RELATED_RESOURCES')}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={dois}
            className="p-mt-4"
          >
            <Column field="id" header="DOI" body={({ id }) => id} />
            <Column
              header={t('ACTIONS')}
              body={() => (
                <Button className="p-button-danger" icon="pi pi-trash" />
              )}
            />
          </DataTable>
        </div>
      </div>
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="doi">DOI</label>
          <InputText
            id="doi"
            type="text"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-3">
          <Button
            label={t('ADD_DOI')}
            icon="pi pi-plus"
            className="p-mt-2 p-mb-2"
            onClick={addDoi}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceRelatedResources;
