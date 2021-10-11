import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// TODO: Grab this information from the relevant service.
const languages = [
  {
    label: 'English',
    name: 'English',
    value: 'en',
    iso_code_639_1: 'en',
    iso_code_639_2: 'eng',
  },
  {
    label: 'Spanish',
    name: 'Spanish',
    value: 'sp',
    iso_code_639_1: 'sp',
    iso_code_639_2: 'spa',
  },
  {
    label: 'Italian',
    name: 'Italian',
    value: 'it',
    iso_code_639_1: 'it',
    iso_code_639_2: 'ita',
  },
];

const MultilingualEntriesTable = ({
  mode,
  data,
  header,
  multipleLines,
  className,
  onDeleteItem,
  onAddItem,
}) => {
  const { t } = useTranslation();
  const [languageValue, setLanguageValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState(data.map((s) => s.language) || []);

  const getAvailableLanguages = () =>
    languages.filter((l) => !selectedLanguages.map((s) => s.value).includes(l.value));

  const getLanguageByValue = (v) => languages?.filter((l) => l.value === v)?.pop();

  const onSubmit = (e) => {
    e.preventDefault();
    const selectedLang = getLanguageByValue(languageValue);
    onAddItem({ language: selectedLang, value: textValue });
    setSelectedLanguages([...selectedLanguages, selectedLang]);
    setLanguageValue('');
    setTextValue('');
  };

  const onDelete = (langValue) => {
    onDeleteItem(langValue);
    setSelectedLanguages(selectedLanguages.filter((s) => s?.value !== langValue));
  };

  const footerTemplate = mode === 'edit' && (
    <form className="p-formgrid p-grid p-fluid" onSubmit={onSubmit}>
      <div className="p-col-2">
        <div className="p-field">
          <Dropdown
            value={languageValue}
            options={getAvailableLanguages()}
            onChange={(e) => setLanguageValue(e.value)}
            placeholder={t('SELECT_LANGUAGE')}
          />
        </div>
      </div>
      <div className="p-col-8">
        <div className="p-field">
          {!multipleLines && (
            <InputText
              type="text"
              disabled={languageValue.length === 0}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
          )}
          {multipleLines && (
            <InputTextarea
              disabled={languageValue.length === 0}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              rows={5}
              cols={50}
            />
          )}
        </div>
      </div>
      <div className="p-col-2 p-text-right">
        <Button
          disabled={languageValue.length === 0}
          type="submit"
          label={t('ADD')}
          className="p-mr-2 p-mb-2"
        />
      </div>
    </form>
  );

  return (
    <DataTable
      header={header}
      emptyMessage={t('NO_ENTRIES_FOUND')}
      value={data}
      dataKey="language"
      className={classNames([className])}
      footer={footerTemplate}
    >
      <Column header={t('LANGUAGE')} field="name" body={({ language: { name } }) => name || ''} />
      <Column header={t('TEXT')} field="value" />
      {mode === 'edit' && (
        <Column
          body={({ language }) => (
            <div className="p-text-right">
              <Button
                className="p-button-danger"
                icon="pi pi-trash"
                onClick={() => onDelete(language?.value)}
              />
            </div>
          )}
        />
      )}
    </DataTable>
  );
};

export default MultilingualEntriesTable;
