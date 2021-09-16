import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { searchAgroVoc } from '../../../services/integrations';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';

const freeKeywordTemplate = (keyword) => ({
  scheme: 'free',
  scheme_namespace: '',
  taxon_name: keyword,
  taxon_id: '',
  taxon_path: '',
});

const ResourceClassification = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [keywords, setKeywords] = useState(initialData?.keywords || []);
  const [results, setResults] = useState([]);
  const [kw, setKw] = useState('');
  const { setError } = useContext(ToastContext);

  const addKeyword = () => {
    const newKw = typeof kw === 'object' ? kw : freeKeywordTemplate(kw);
    const newKeywords = [...keywords, newKw];
    setKeywords(newKeywords);
    setKw('');
  };

  const resultTemplate = (item) =>
    `${item.taxon_name} [AgroVoc ID: ${item.taxon_id}]`;

  const handleSearch = async ({ query }) => {
    try {
      const { suggestions } = await searchAgroVoc(query);
      setResults(suggestions);
    } catch (error) {
      setError(handleError(error));
    }
  };

  useEffect(() => {
    setter(keywords);
  }, [keywords]); // eslint-disable-line react-hooks/exhaustive-deps

  const keywordsFooter = mode === 'edit' && (
    <div className="p-formgrid p-grid p-fluid">
      <div className="p-col-10">
        <div className="p-field">
          <AutoComplete
            disabled={mode === 'review'}
            name="keyword"
            value={kw}
            suggestions={results}
            field="taxon_name"
            completeMethod={handleSearch}
            itemTemplate={resultTemplate}
            selectedItemTemplate={resultTemplate}
            onChange={(e) => setKw(e.value)}
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
        <Column
          field="taxon_name"
          header={t('KEYWORD')}
          body={(rowData) => {
            if (rowData.taxon_id !== '') {
              return `${rowData.taxon_name} [AgroVoc ID: ${rowData.taxon_id}]`;
            }
            return rowData.taxon_name;
          }}
        />
      </DataTable>
    </Fieldset>
  );
};

export default ResourceClassification;
