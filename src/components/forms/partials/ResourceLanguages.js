import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const demoLanguages = [
  {
    name: 'English',
  },
  {
    name: 'French',
  },
];

const ResourceLanguages = ({ resourceLanguages, header }) => {
  const { t } = useTranslation();
  const [languages, setLanguages] = useState(resourceLanguages || []);
  const [language, setLanguage] = useState('');

  const onDeleteItem = () => {};

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-col-12">
          <DataTable
            header={header}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={demoLanguages}
            dataKey="name"
          >
            <Column field="name" />
            <Column
              className="p-text-right"
              body={(rowData) => (
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => onDeleteItem(rowData.lang)}
                />
              )}
            />
          </DataTable>
        </div>
      </div>
      <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
        <div className="p-col-10">
          <Dropdown
            id="language"
            value={language}
            placeholder={t('RESOURCE_LANGUAGE')}
            options={languages}
            onChange={(e) => setLanguage(e.value)}
          />
        </div>
        <div className="p-col-2 p-text-right">
          <Button
            label={t('COLLECTION_TITLE_ADD')}
            icon="pi pi-plus"
            className="p-button-sm p-component"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceLanguages;
