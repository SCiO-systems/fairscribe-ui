/* eslint-disable no-console */
import { Calendar } from 'primereact/calendar';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '../../../utilities/hooks';

const ResourceLifecycle = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [version, setVersion] = useState(initialData.resource_version ?? '');
  const debouncedVersion = useDebounce(version, 500);
  const [versionDescription, setVersionDescription] = useState(
    initialData.resource_version_description ?? ''
  );
  const debouncedDescription = useDebounce(versionDescription, 500);
  const [releaseDate, setReleaseDate] = useState(
    initialData.release_date ?? ''
  );
  const debouncedReleaseDate = useDebounce(releaseDate, 500);
  const [embargoDate, setEmbargoDate] = useState(
    initialData.embargo_date ?? ''
  );
  const debouncedEmbargoDate = useDebounce(embargoDate, 500);

  useEffect(
    () =>
      setter(
        debouncedVersion,
        debouncedDescription,
        debouncedReleaseDate,
        debouncedEmbargoDate
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      debouncedVersion,
      debouncedDescription,
      debouncedReleaseDate,
      debouncedEmbargoDate,
    ]
  );

  return (
    <Fieldset
      legend={t('RESOURCE_LIFECYCLE')}
      style={{ position: 'relative' }}
      className="relative p-mb-4"
    >
      <div className="p-fluid p-mt-2">
        <div className="p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="version">{t('RESOURCE_VERSION')}</label>
            <InputText
              disabled={mode === 'review'}
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
              disabled={mode === 'review'}
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
              disabled={mode === 'review'}
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
              disabled={mode === 'review'}
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
