import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { autocompleteTerm, listVocabularies } from '../../../services/integrations';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';

const defaultVocabulary = { label: 'Free', value: 'free' };

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
          // Choose the proper value based on if the keyword has a structure or not.
          // We can only have one keyword with the same value and scheme.
          const s = keyword?.scheme || defaultVocabulary.value;
          const v = keyword?.taxon_name || keyword;
          if (s === scheme && v === value) {
            return false;
          }
          return true;
        })
        .concat({
          scheme: keyword?.scheme || defaultVocabulary?.value,
          value: keyword?.taxon_name || keyword,
          frequency: '',
          code: keyword?.taxon_id || '',
        })
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
          .map(({ human_readable: label, alias: value }) => ({ label, value }))
          .concat(defaultVocabulary)
      );
    } catch (error) {
      setError(handleError(error));
    }
  };

  const triggerAutocomplete = async ({ query }) => {
    // If the user has chosen the default vocabulary (aka free).
    if (vocabulary === defaultVocabulary.value || vocabulary === '') {
      setSuggestions([]);
      return;
    }

    try {
      const results = await autocompleteTerm(vocabulary, query);
      setSuggestions((results?.length > 0 && results) || []);
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
              minLength="2"
              completeMethod={triggerAutocomplete}
              itemTemplate={(item) => item.taxon_name}
              selectedItemTemplate={(item) => item.taxon_name}
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
      <DataTable
        sortField="value"
        sortOrder={1}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={keywords}
        footer={keywordsFooter}
      >
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
