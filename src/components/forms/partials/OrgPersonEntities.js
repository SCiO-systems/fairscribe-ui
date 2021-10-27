import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SCHEME_ORCID = 'ORCID';
export const SCHEME_ROR = 'ROR';

const schemes = [
  {
    label: 'Individual',
    value: SCHEME_ORCID,
  },
  {
    label: 'Organisation',
    value: SCHEME_ROR,
  },
];

const OrgsPersonsEntities = ({
  mode,
  title,
  entries,
  setEntries,
  defaultScheme,
  className,
  onAutoComplete,
  onSelectAutoComplete,
  itemTemplate,
}) => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [shortName, setShortName] = useState('');
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [scheme, setScheme] = useState(defaultScheme || '');
  const [autocomplete, setAutocomplete] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (autocomplete) {
      setFullName(autocomplete?.fullname);
      setShortName(autocomplete?.shortname);
      setEmail(autocomplete?.email);
      setUrl(autocomplete?.url);
      setId(autocomplete?.id);
    }
  }, [autocomplete]);

  useEffect(() => {
    setFullName('');
    setShortName('');
    setId('');
    setUrl('');
    setEmail('');
  }, [scheme]); // eslint-disable-line

  const getUrlByIdAndScheme = () => {
    if (scheme === SCHEME_ORCID) {
      return `https://orcid.org/${id}`;
    }
    if (scheme === SCHEME_ROR) {
      return `https://ror.org/${id}`;
    }
    return '';
  };

  const addEntry = () => {
    const filtered = entries.filter((e) => e.agent_ids[0].value !== id);
    setEntries([
      ...filtered,
      {
        full_name: fullName,
        short_name: shortName,
        url: url.length === 0 ? getUrlByIdAndScheme() : url,
        email,
        agent_ids: [{ scheme, value: id }],
      },
    ]);
    setId('');
    setFullName('');
    setShortName('');
    setEmail('');
    setUrl('');
  };

  const removeEntry = (identifier) => {
    setEntries(entries.filter((e) => e.agent_ids[0].value !== identifier));
  };

  const orgPersonFooterTemplate = mode === 'edit' && (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addEntry();
      }}
    >
      <div className="p-mt-2 p-grid p-formgrid p-fluid p-d-flex p-jc-end">
        {defaultScheme === undefined && (
          <div className="p-col-10">
            <Dropdown
              filter
              filterBy="label"
              id="type"
              name="type"
              disabled={defaultScheme !== undefined}
              value={defaultScheme || scheme || ''}
              options={schemes}
              placeholder="Choose individual or organisation"
              onChange={(e) => setScheme(e.value)}
            />
          </div>
        )}
        <div className="p-col-2">
          <Button label={t('ADD')} type="submit" icon="pi pi-plus" />
        </div>
      </div>
      {scheme !== '' && (
        <div className="p-mt-3 p-formgrid p-grid p-fluid">
          <div className="p-col-12 p-md-12">
            <div className="p-field">
              <label htmlFor="fullname">{t('FULLNAME')}</label>
              {scheme === SCHEME_ROR ? (
                <AutoComplete
                  id="fullname"
                  disabled={mode === 'review'}
                  value={fullName || ''}
                  autoComplete="off"
                  onChange={(e) => setFullName(e.target.value)}
                  completeMethod={(e) => onAutoComplete(e, setSuggestions)}
                  itemTemplate={itemTemplate}
                  selectedItemTemplate={itemTemplate}
                  suggestions={suggestions}
                  onSelect={(e) => onSelectAutoComplete(e, setAutocomplete)}
                />
              ) : (
                <InputText
                  id="fullname"
                  autoComplete="off"
                  disabled={mode === 'review'}
                  value={fullName || ''}
                  onChange={(e) => setFullName(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="p-col-12 p-md-6">
            <div className="p-field">
              <label htmlFor="shortname">{t('SHORTNAME')}</label>
              <InputText
                id="shortname"
                disabled={mode === 'review' || scheme === SCHEME_ORCID}
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
              />
            </div>
          </div>
          <div className="p-col-12 p-md-6">
            <div className="p-field">
              <label htmlFor="id">{scheme}</label>
              <InputText
                id="id"
                disabled={mode === 'review'}
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>
          <div className="p-col-12 p-md-6">
            <div className="p-field">
              <label htmlFor="url">{t('URL')}</label>
              <InputText
                id="url"
                disabled={mode === 'review'}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="p-col-12 p-md-6">
            <div className="p-field">
              <label htmlFor="email">{t('EMAIL')}</label>
              <InputText
                id="email"
                disabled={mode === 'review'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );

  const idTemplate = ({ agent_ids: ids }) => (
    <span>
      <strong>{ids[0]?.scheme}</strong>: {ids[0]?.value}
    </span>
  );

  return (
    <div className={className || 'p-mb-4'}>
      <DataTable
        header={title}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={entries}
        footer={orgPersonFooterTemplate}
        style={{ wordBreak: 'break-word' }}
      >
        <Column field="full_name" header={t('FULLNAME')} />
        <Column field="short_name" header={t('SHORTNAME')} />
        <Column
          field="url"
          header={t('URL')}
          body={(rowData) => <span style={{ wordBreak: 'break-all' }}>{rowData?.url}</span>}
        />
        <Column field="email" header={t('EMAIL')} />
        <Column field="id" header={t('ID')} body={idTemplate} />
        {mode === 'edit' && (
          <Column
            body={(rowData) => (
              <div className="p-text-right">
                <Button
                  className="p-button-danger"
                  icon="pi pi-trash"
                  onClick={() => removeEntry(rowData?.agent_ids[0]?.value)}
                />
              </div>
            )}
          />
        )}
      </DataTable>
    </div>
  );
};

export default OrgsPersonsEntities;
