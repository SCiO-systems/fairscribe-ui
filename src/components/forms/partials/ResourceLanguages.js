import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ResourceLanguage = ({ availableLanguages, setLanguage, language, mode }) => {
  const { t } = useTranslation();

  // TODO: Add the list of languages here.

  return (
    <div className="p-fluid p-formgrid p-grid">
      <div className="p-col-12">
        <div className="p-field">
          <label htmlFor="resourceCollections">{t('RESOURCE_LANGUAGE')}</label>
          <Dropdown
            id="language"
            disabled={mode !== 'edit'}
            value={language || ''}
            options={availableLanguages}
            onChange={(e) => setLanguage(e.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceLanguage;
