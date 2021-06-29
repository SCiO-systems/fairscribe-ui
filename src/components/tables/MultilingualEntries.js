import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const availableLanguages = [{ label: 'English', value: 'en' }];

const MultilingualEntriesTable = ({
  data,
  header,
  multipleLines,
  className,
  onDeleteItem,
  onAddItem,
}) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(availableLanguages[0].value);
  const [value, setValue] = useState('');

  const footerTemplate = (
    <div className="p-formgrid p-grid p-fluid">
      <div className="p-col-2">
        <div className="p-field">
          <Dropdown
            value={language}
            options={availableLanguages}
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
          label={t('ADD')}
          className="p-mr-2 p-mb-2"
          onClick={() => {
            onAddItem({ language, value });
            setValue('');
          }}
        />
      </div>
    </div>
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
      <Column field="language" />
      <Column field="value" />
      <Column
        body={(rowData) => (
          <div className="p-text-right">
            <Button
              className="p-button-danger"
              icon="pi pi-trash"
              onClick={() => onDeleteItem(rowData.language)}
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default MultilingualEntriesTable;
