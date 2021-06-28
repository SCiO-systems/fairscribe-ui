/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ResourceLifecycle = ({ projectLifecycle }) => {
  const { t } = useTranslation();
  const [version, setVersion] = useState('');
  const [versionDescription, setVersionDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [embargoDate, setEmbargoDate] = useState('');

  return (
    <Fieldset
      legend={t('RESOURCE_LIFECYCLE')}
      style={{ position: 'relative' }}
      className="relative p-mb-4"
    >
      <Button
        style={{ position: 'absolute', top: '-0.2rem', right: '1.6rem' }}
        label={t('CHECK_FAIR')}
      />
      <div className="p-fluid p-mt-2">
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="version">{t('RESOURCE_VERSION')}</label>
            <InputText
              id="version"
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="description">{t('VERSION_DESCRIPTION')}</label>
            <InputTextarea
              id="description"
              type="text"
              value={versionDescription}
              rows={5}
              onChange={(e) => setVersionDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="releaseDate">{t('RELEASE_DATE')}</label>
            <Calendar
              showIcon
              showButtonBar
              id="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.value)}
            />
          </div>
        </div>
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="embargoDate">{t('EMBARGO_DATE')}</label>
            <Calendar
              showIcon
              showButtonBar
              id="embargoDate"
              value={embargoDate}
              onChange={(e) => setEmbargoDate(e.value)}
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceLifecycle;
