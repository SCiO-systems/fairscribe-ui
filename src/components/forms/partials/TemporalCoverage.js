/* eslint-disable no-console */
import { Calendar } from 'primereact/calendar';
import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertDateToFormat, getDateFromFormat } from '../../../utilities/dates';

const TemporalCoverage = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [temporalFromDate, setTemporalFromDate] = useState(
    initialData?.data_temporal_coverage?.from || ''
  );
  const [temporalToDate, setTemporalToDate] = useState(
    initialData?.data_temporal_coverage?.to || ''
  );
  const [collectionFromDate, setCollectionFromDate] = useState(
    initialData?.data_collection_period?.from || ''
  );
  const [collectionToDate, setCollectionToDate] = useState(
    initialData?.data_collection_period?.to || ''
  );

  useEffect(() => {
    const temporalCoverage = {
      from: convertDateToFormat(temporalFromDate),
      to: convertDateToFormat(temporalToDate),
      description: 'Time period to which the data refer',
    };
    const collectionPeriod = {
      from: convertDateToFormat(collectionFromDate),
      to: convertDateToFormat(collectionToDate),
      description: 'Data collection period',
    };
    setter(temporalCoverage, collectionPeriod);
  }, [temporalFromDate, temporalToDate, collectionFromDate, collectionToDate]); // eslint-disable-line

  return (
    <Fieldset legend={t('TEMPORAL_COVERAGE')} className="p-mb-4">
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-mb-3 p-col-12">
            <label htmlFor="temporalCoverage">{t('TIME_PERIOD_TO_WHICH_THE_DATA_REFER')}</label>
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="from_date">{t('FROM_DATE')}</label>
            <Calendar
              dateFormat="yy-mm-dd"
              disabled={mode === 'review' || mode === 'view'}
              showIcon
              showButtonBar
              id="from_date"
              value={getDateFromFormat(temporalFromDate)}
              onChange={(e) => setTemporalFromDate(e.value)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="to_date">{t('TO_DATE')}</label>
            <Calendar
              dateFormat="yy-mm-dd"
              disabled={mode === 'review' || mode === 'view'}
              showIcon
              showButtonBar
              id="to_date"
              value={getDateFromFormat(temporalToDate)}
              onChange={(e) => setTemporalToDate(e.value)}
            />
          </div>
        </div>
        <div className="p-formgrid p-grid p-mt-2">
          <div className="p-mb-3 p-col-12">
            <label htmlFor="collectionPeriod">{t('COLLECTION_PERIOD')}</label>
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="from_date">{t('FROM_DATE')}</label>
            <Calendar
              dateFormat="yy-mm-dd"
              disabled={mode === 'review' || mode === 'view'}
              showIcon
              showButtonBar
              id="from_date"
              value={getDateFromFormat(collectionFromDate)}
              onChange={(e) => setCollectionFromDate(e.value)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="to_date">{t('TO_DATE')}</label>
            <Calendar
              dateFormat="yy-mm-dd"
              disabled={mode === 'review' || mode === 'view'}
              showIcon
              showButtonBar
              id="to_date"
              value={getDateFromFormat(collectionToDate)}
              onChange={(e) => setCollectionToDate(e.value)}
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default TemporalCoverage;
