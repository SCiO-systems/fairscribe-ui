import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const freeKeywordTemplate = (keyword) => ({
  scheme: 'free',
  scheme_namespace: '',
  taxon_name: keyword,
  taxon_id: '',
  taxon_path: '',
});

const ResourceClassification = ({ initialData, setter, mode }) => {
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

  const keywordsFooter = () =>
    mode === 'edit' && (
      <div className="p-formgrid p-grid p-fluid">
        <div className="p-col-10">
          <div className="p-field">
            <InputText
              disabled={mode === 'review'}
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
