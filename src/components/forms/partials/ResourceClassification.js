import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  autocompleteTerm,
  extractKeywords,
  listVocabularies,
} from '../../../services/integrations';
import { ToastContext } from '../../../store';
import { handleError } from '../../../utilities/errors';
import { getEnglishValue } from '../../../utilities/transformers';

const defaultVocabulary = { label: 'Free', value: 'free' };

const ResourceClassification = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const { setError } = useContext(ToastContext);

  const [keywords, setKeywords] = useState(initialData?.keywords || []);
  const [availableVocabularies, setAvailableVocabularies] = useState([defaultVocabulary]);
  const [vocabulary, setVocabulary] = useState('');
  const [kw, setKw] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [isExtractLoading, setIsExtractLoading] = useState(false);
  const [extractedTerms, setExtractedTerms] = useState([]);

  const getHumanReadableVocabularyName = (scheme) =>
    availableVocabularies.filter(({ value }) => value === scheme)?.pop()?.label || scheme;

  const extractKeywordsFromTitleAndDescription = async () => {
    setIsExtractLoading(true);
    try {
      const title = getEnglishValue(initialData?.title);
      const description = getEnglishValue(initialData?.description);
      const terms = await extractKeywords(`${title} ${description}`);
      if (terms.length > 1) {
        setExtractedTerms(
          terms.map(({ scheme, term, id }) => ({ scheme, value: term, code: id, frequency: '1' }))
        );
      }
    } catch (error) {
      setError(handleError(error));
    }
    setIsExtractLoading(false);
  };

  const addKeyword = (keyword) => {
    const filtered = keywords.filter(({ scheme, value }) => {
      // Choose the proper value based on if the keyword has a structure or not.
      // We can only have one keyword with the same value and scheme.
      const s =
        keyword?.scheme || getHumanReadableVocabularyName(vocabulary) || defaultVocabulary.value;
      const v = keyword?.value || keyword?.term || keyword;
      if (s === scheme && v === value) {
        return false;
      }
      return true;
    });
    setKeywords([
      ...filtered,
      {
        scheme: getHumanReadableVocabularyName(vocabulary) || defaultVocabulary?.value,
        value: keyword?.term || keyword,
        frequency: '1',
        code: keyword?.code || keyword?.id || '',
      },
    ]);
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
      setSuggestions(results?.length > 0 ? results : []);
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

  useEffect(() => {
    if (extractedTerms?.length > 0) {
      const filtered = extractedTerms?.filter(({ scheme, value }) => {
        if (keywords.some((k) => k?.value === value && k?.scheme === scheme)) {
          return false;
        }
        return true;
      });
      setKeywords([...keywords, ...filtered]);
      setExtractedTerms([]);
    }
  }, [extractedTerms]); // eslint-disable-line

  const keywordsFooter = mode === 'edit' && (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addKeyword(kw);
        setKw('');
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
              value={kw}
              minLength="2"
              completeMethod={triggerAutocomplete}
              itemTemplate={(item) => item?.term}
              selectedItemTemplate={(item) => item?.term}
              suggestions={suggestions}
              onChange={(e) => setKw(e?.value)}
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
    <Fieldset id="resource-keywords" legend={t('RESOURCE_CLASSIFICATION')} className="p-mb-4">
      <div className="p-mb-4 p-mt-0 p-text-right">
        <Button
          icon="pi pi-book"
          label="Extract keywords"
          disabled={mode === 'review'}
          loading={isExtractLoading}
          onClick={() => extractKeywordsFromTitleAndDescription()}
        />
      </div>
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
