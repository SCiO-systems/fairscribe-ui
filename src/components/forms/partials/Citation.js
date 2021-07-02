import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Citation = ({ mode, citation, setCitation }) => {
  const { t } = useTranslation();

  return (
    <div className="p-fluid">
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-12">
          <label htmlFor="name">{t('CITATION')}</label>
          <InputTextarea
            disabled={mode === 'review'}
            id="name"
            type="text"
            value={citation}
            rows={5}
            onChange={(e) => setCitation(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Citation;
