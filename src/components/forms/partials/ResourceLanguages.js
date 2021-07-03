import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import languageMappings from '../../../data/languages/language-mappings.json';
import languagesList from '../../../data/languages/languages.json';

const getLanguageNameFromCode = (code) => languageMappings[code];

const ResourceLanguages = ({ languages, setLanguages, header, mode }) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(languagesList[0]);

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-col-12">
          <DataTable
            header={header}
            emptyMessage={t('NO_ENTRIES_FOUND')}
            value={languages}
            dataKey="value"
          >
            <Column
              header="Language"
              body={(rowData) => getLanguageNameFromCode(rowData)}
            />
            <Column header="Language code" body={(rowData) => rowData} />
            {mode === 'edit' && (
              <Column
                className="p-text-right"
                body={(rowData) => (
                  <Button
                    className="p-button-danger"
                    icon="pi pi-trash"
                    onClick={() => {
                      setLanguages(
                        languages.filter((item) => item !== rowData)
                      );
                    }}
                  />
                )}
              />
            )}
          </DataTable>
        </div>
      </div>
      {mode === 'edit' && (
        <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
          <div className="p-col-10">
            <Dropdown
              id="language"
              value={selectedLanguage && selectedLanguage.value}
              placeholder={t('RESOURCE_LANGUAGE')}
              options={languagesList}
              onChange={(e) => {
                const lang = languagesList.filter(
                  (item) => item.value === e.value
                )[0];
                setSelectedLanguage(lang);
              }}
            />
          </div>
          <div className="p-col-2 p-text-right">
            <Button
              label={t('COLLECTION_TITLE_ADD')}
              icon="pi pi-plus"
              className="p-button-sm p-component"
              onClick={() => {
                setLanguages(
                  languages
                    .filter((item) => item !== selectedLanguage.value)
                    .concat(selectedLanguage.value)
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceLanguages;
