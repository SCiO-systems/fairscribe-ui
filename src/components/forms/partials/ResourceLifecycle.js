/* eslint-disable no-console */
import { Calendar } from 'primereact/calendar';
import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertDateToFormat, getDateFromFormat } from '../../../utilities/dates';
import SimpleNumberField from '../../fields/SimpleNumberField';
import SimpleTextArea from '../../fields/SimpleTextArea';

const ResourceLifecycle = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [version, setVersion] = useState(initialData?.resource_version || 1.0);
  const [versionDescription, setVersionDescription] = useState(
    initialData?.resource_version_description || ''
  );
  const [releaseDate, setReleaseDate] = useState(initialData?.release_date || '');
  const [embargoDate, setEmbargoDate] = useState(initialData?.embargo_date || '');

  useEffect(() => {
    setter(
      version,
      versionDescription,
      convertDateToFormat(releaseDate),
      convertDateToFormat(embargoDate)
    );
  }, [version, versionDescription, releaseDate, embargoDate]); // eslint-disable-line

  return (
    <Fieldset
      legend={t('RESOURCE_LIFECYCLE')}
      style={{ position: 'relative' }}
      className="relative p-mb-4"
    >
      <SimpleNumberField
        mode={mode}
        numberDecimalDigits={1}
        numberMode="decimal"
        title={t('RESOURCE_VERSION')}
        number={version}
        setNumber={setVersion}
        className="p-mb-4"
      />
      <SimpleTextArea
        mode={mode}
        title={t('VERSION_DESCRIPTION')}
        text={versionDescription}
        setText={setVersionDescription}
        className="p-mb-4"
      />
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-6">
          <label htmlFor="releaseDate">{t('RELEASE_DATE')}</label>
          <Calendar
            dateFormat="yy-mm-dd"
            disabled={mode === 'review'}
            showIcon
            showButtonBar
            id="releaseDate"
            value={getDateFromFormat(releaseDate)}
            onChange={(e) => setReleaseDate(e.value)}
          />
        </div>
        <div className="p-field p-col-12 p-md-6">
          <label htmlFor="embargoDate">{t('EMBARGO_DATE')}</label>
          <Calendar
            dateFormat="yy-mm-dd"
            disabled={mode === 'review'}
            showIcon
            showButtonBar
            id="embargoDate"
            value={getDateFromFormat(embargoDate)}
            onChange={(e) => setEmbargoDate(e.value)}
          />
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceLifecycle;
