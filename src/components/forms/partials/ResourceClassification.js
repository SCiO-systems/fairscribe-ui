import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const freeKeywordTemplate = (keyword) => ({
  scheme: 'free',
  scheme_namespace: '',
  taxon_name: keyword,
  taxon_id: '',
  taxon_path: '',
});

const ResourceClassification = ({ initialData, setter }) => {
  const { t } = useTranslation();
  const [keywords, setKeywords] = useState(initialData.keywords ?? []);
  const [kw, setKw] = useState('');

  const addKeyword = () => {
    const newKeywords = [...keywords, freeKeywordTemplate(kw)];
    setKeywords(newKeywords);
    setKw('');
  };

  useEffect(() => {
    setter(keywords);
  }, [keywords]); // eslint-disable-line react-hooks/exhaustive-deps

  const keywordsFooter = (
    <div className="p-formgrid p-grid p-fluid">
      <div className="p-col-10">
        <div className="p-field">
          <InputText
            name="keyword"
            value={kw}
            type="text"
            onChange={(e) => setKw(e.target.value)}
          />
        </div>
      </div>
      <div className="p-col-2">
        <div className="p-field">
          <Button label={t('ADD')} onClick={addKeyword} />
        </div>
      </div>
    </div>
  );

  return (
    <Fieldset
      legend={t('RESOURCE_CLASSIFICATION')}
      style={{ position: 'relative' }}
      className="p-mb-4"
    >
      <Button
        style={{ position: 'absolute', top: '-0.2rem', right: '1.6rem' }}
        label={t('CHECK_FAIR')}
      />
      <DataTable
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={keywords}
        className="p-mt-4"
        footer={keywordsFooter}
      >
        <Column field="taxon_name" header={t('KEYWORD')} />
      </DataTable>
    </Fieldset>
  );
};

export default ResourceClassification;
