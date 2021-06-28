/* eslint-disable no-console */
import { Fieldset } from 'primereact/fieldset';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ResourceClassification = ({ projectClassification }) => {
  const { t } = useTranslation();
  const [keywords, setKeywords] = useState('');

  return (
    <Fieldset legend={t('RESOURCE_CLASSIFICATION')} className="p-mb-4">
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="keywords">{t('KEYWORDS')}</label>
            <InputTextarea
              id="keywords"
              type="text"
              value={keywords}
              rows={5}
              onChange={(e) => setKeywords(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceClassification;
