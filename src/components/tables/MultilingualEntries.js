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
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'sp' },
  { label: 'Italian', value: 'it' },
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
  const [language, setLanguage] = useState('');
  const [value, setValue] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState(
    data?.map((d) => d?.language) || []
  );

  const getAvailableLanguages = () =>
    languages.filter((lang) => !selectedLanguages.includes(lang.value));

  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem({ language, value });
    setSelectedLanguages(selectedLanguages.concat(language));
    setLanguage('');
    setValue('');
  };

  const onDelete = (lang) => {
    onDeleteItem(lang);
    setSelectedLanguages(selectedLanguages.filter((v) => v !== lang));
  };

  const footerTemplate = mode === 'edit' && (
    <form className="p-formgrid p-grid p-fluid" onSubmit={onSubmit}>
      <div className="p-col-2">
        <div className="p-field">
          <Dropdown
            value={language}
            options={getAvailableLanguages()}
            onChange={(e) => setLanguage(e.value)}
            placeholder={t('SELECT_LANGUAGE')}
          />
        </div>
      </div>
      <div className="p-col-8">
        <div className="p-field">
          {!multipleLines && (
            <InputText
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
          {multipleLines && (
            <InputTextarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={5}
              cols={50}
            />
          )}
        </div>
      </div>
      <div className="p-col-2 p-text-right">
        <Button
          disabled={language.length === 0}
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
      <Column header={t('LANGUAGE')} field="language" />
      <Column header={t('TEXT')} field="value" />
      {mode === 'edit' && (
        <Column
          body={(l) => (
            <div className="p-text-right">
              <Button
                className="p-button-danger"
                icon="pi pi-trash"
                onClick={() => onDelete(l.language)}
              />
            </div>
          )}
        />
      )}
    </DataTable>
  );
};

export default MultilingualEntriesTable;
