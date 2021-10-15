import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { listVocabularies } from '../../../services/integrations';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';

const defaultVocabulary = {
  label: 'Free',
  value: 'free',
};

const ResourceClassification = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const { setError } = useContext(ToastContext);

  const [keywords, setKeywords] = useState(initialData?.keywords || []);
  const [availableVocabularies, setAvailableVocabularies] = useState([defaultVocabulary]);
  const [vocabulary, setVocabulary] = useState('');
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getHumanReadableVocabularyName = (scheme) =>
    availableVocabularies.filter(({ value }) => value === scheme)?.pop()?.label || scheme;

  const addKeyword = () => {
    setKeywords(
      keywords
        .filter(({ scheme, value }) => {
          if (vocabulary === scheme && keyword === value) {
            return false;
          }
          return true;
        })
        .concat({ scheme: vocabulary, value: keyword, frequency: '', code: '' })
    );
    setKeyword('');
    setVocabulary('');
  };

  const removeKeyword = (s, v) => {
    setKeywords(
      keywords.filter(({ scheme, value }) => {
        if (s === scheme && v === value) {
          return false;
        }
        return true;
      })
    );
  };

  const loadVocabularies = async () => {
    try {
      const response = await listVocabularies();
      setAvailableVocabularies(
        response
          .map(({ human_readable: label, index_id: value }) => ({ label, value }))
          .concat(defaultVocabulary)
      );
    } catch (error) {
      setError(handleError(error));
    }
  };

  useEffect(() => {
    loadVocabularies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setter(keywords);
  }, [keywords]); // eslint-disable-line react-hooks/exhaustive-deps

  const keywordsFooter = mode === 'edit' && (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addKeyword();
      }}
    >
      <div className="p-formgrid p-grid p-fluid">
        <div className="p-col-3">
          <Dropdown
            filter
            filterBy="label"
            id="type"
            name="type"
            value={vocabulary}
            options={availableVocabularies}
            placeholder="Choose vocabulary"
            onChange={(e) => setVocabulary(e.value)}
          />
        </div>
        <div className="p-col-7">
          <div className="p-field">
            <AutoComplete
              disabled={mode === 'review'}
              name="keyword"
              value={keyword}
              suggestions={suggestions}
              onChange={(e) => setKeyword(e.value)}
            />
          </div>
        </div>
        <div className="p-col-2">
          <div className="p-field">
            <Button label={t('ADD')} type="submit" />
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <Fieldset legend={t('RESOURCE_CLASSIFICATION')} className="p-mb-4">
      <DataTable emptyMessage={t('NO_ENTRIES_FOUND')} value={keywords} footer={keywordsFooter}>
        <Column field="value" header={t('KEYWORD')} />
        <Column
          field="scheme"
          header={t('SCHEME')}
          body={({ scheme }) => <span>{getHumanReadableVocabularyName(scheme)}</span>}
        />
        {mode === 'edit' && (
          <Column
            body={({ scheme, value }) => (
              <div className="p-text-right">
                <Button
                  icon="pi pi-trash"
                  className="p-button p-component p-button-danger p-button-icon-only"
                  onClick={() => removeKeyword(scheme, value)}
                />
              </div>
            )}
          />
        )}
      </DataTable>
    </Fieldset>
  );
};

export default ResourceClassification;
