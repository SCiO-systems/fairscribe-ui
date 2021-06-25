import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const availableLanguages = [
  { label: 'English', value: 'English' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Italian', value: 'Italian' },
];

/*
Expecting data to be something like:
[
  {
    lang: 'English',
    text: 'My text',
  },
  {
    lang: 'Spanish',
    text: 'My spanish text',
  },
]
*/
const MultilingualEntriesTable = ({
  data,
  header,
  multipleLines,
  className,
  onDeleteItem,
  onAddItem,
}) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(null);

  const footerTemplate = (
    <div className="p-formgroup-inline">
      <div className="p-field">
        <Dropdown
          value={language}
          options={availableLanguages}
          onChange={(e) => setLanguage(e.value)}
          placeholder={t('SELECT_LANGUAGE')}
        />
      </div>
      <div className="p-field">
        {!multipleLines && <InputText style={{ width: '27rem' }} type="text" />}
        {multipleLines && <InputTextarea rows={5} cols={50} />}
      </div>
      <Button label={t('ADD')} className="p-mr-2 p-mb-2" />
    </div>
  );

  return (
    <DataTable
      header={header}
      emptyMessage={t('NO_ENTRIES_FOUND')}
      value={data}
      dataKey="lang"
      className={classNames([className])}
      footer={footerTemplate}
    >
      <Column field="lang" />
      <Column field="text" />
      <Column
        body={(rowData) => (
          <Button
            className="p-button-danger"
            icon="pi pi-trash"
            onClick={() => onDeleteItem(rowData.lang)}
          />
        )}
      />
    </DataTable>
  );
};

export default MultilingualEntriesTable;
