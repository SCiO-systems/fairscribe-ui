/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as countryOptions from './countries.json';

const ResourceCoverage = ({ initialData, setter }) => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState(
    initialData.geospatial_coverage || []
  );
  const [temporalCoverage, setTemporalCoverage] = useState(
    initialData.temporal_coverage || {
      coverage_type: '',
      from: '',
      to: '',
      textual_description: '',
    }
  );
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const tc = { ...temporalCoverage };
    if (tc.from !== '') {
      tc.from = new Date(tc.from).toISOString().split('T').shift();
    }
    if (tc.to !== '') {
      tc.to = new Date(tc.to).toISOString().split('T').shift();
    }
    if (tc.coverage_type === 'timepoint') {
      tc.to = tc.from;
    }
    setter(countries, tc);
  }, [countries, temporalCoverage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fieldset
      legend={t('RESOURCE_COVERAGE')}
      style={{ position: 'relative' }}
      className="relative p-mb-4"
    >
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-col-12">
            <DataTable
              header={t('GEOSPATIAL_COVERAGE')}
              emptyMessage={t('NO_ENTRIES_FOUND')}
              value={countries}
              dataKey="value"
            >
              <Column header="Country Name" field="country_name" />
              <Column
                className="p-text-right"
                body={(rowData) => (
                  <Button
                    className="p-button-danger"
                    icon="pi pi-trash"
                    onClick={() => {
                      setCountries(
                        countries.filter(
                          (item) => item.country_name !== rowData.country_name
                        )
                      );
                    }}
                  />
                )}
              />
            </DataTable>
          </div>
        </div>
        <div className="p-formgrid p-grid p-d-flex p-flex-row p-ai-center p-mt-4">
          <div className="p-col-10">
            <Dropdown
              id="countries"
              optionLabel="country"
              optionValue="country"
              value={selectedCountry}
              placeholder={t('COLLECTION_ENTER_COUNTRY')}
              options={countryOptions.default}
              onChange={(e) => setSelectedCountry(e.target.value)}
            />
          </div>
          <div className="p-col-2 p-text-right">
            <Button
              label={t('COLLECTION_TITLE_ADD')}
              icon="pi pi-plus"
              className="p-button-sm p-component"
              onClick={() => {
                setCountries(
                  countries
                    .filter((item) => item.country_name !== selectedCountry)
                    .concat({
                      coverage_type: 'code',
                      country_name: selectedCountry,
                    })
                );
              }}
            />
          </div>
        </div>
        <div className="p-formgrid p-grid p-mt-4">
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="accessRight">{t('TEMPORAL_COVERAGE_TYPE')}</label>
            <Dropdown
              id="coverage_type"
              options={[
                { label: 'Period', value: 'period' },
                { label: 'Timepoint', value: 'timepoint' },
              ]}
              value={temporalCoverage.coverage_type}
              onChange={(e) =>
                setTemporalCoverage(() => ({
                  ...temporalCoverage,
                  coverage_type: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>
        <div className="p-formgrid p-grid p-mt-4">
          {temporalCoverage.coverage_type === 'period' && (
            <>
              <div className="p-field p-col-12 p-md-12">
                <label htmlFor="from_date">{t('TEMPORAL_FROM_DATE')}</label>
                <Calendar
                  showIcon
                  showButtonBar
                  id="from_date"
                  value={temporalCoverage.from}
                  onChange={(e) =>
                    setTemporalCoverage(() => ({
                      ...temporalCoverage,
                      from: e.value,
                    }))
                  }
                />
              </div>
              <div className="p-field p-col-12 p-md-12">
                <label htmlFor="to_date">{t('TEMPORAL_TO_DATE')}</label>
                <Calendar
                  showIcon
                  showButtonBar
                  id="to_date"
                  value={temporalCoverage.to}
                  onChange={(e) =>
                    setTemporalCoverage(() => ({
                      ...temporalCoverage,
                      to: e.value,
                    }))
                  }
                />
              </div>
            </>
          )}
          {temporalCoverage.coverage_type === 'timepoint' && (
            <div className="p-field p-col-12 p-md-12">
              <label htmlFor="date">{t('TEMPORAL_DATE')}</label>
              <Calendar
                showIcon
                showButtonBar
                id="date"
                value={temporalCoverage.from}
                onChange={(e) =>
                  setTemporalCoverage(() => ({
                    ...temporalCoverage,
                    from: e.value,
                    to: e.value,
                  }))
                }
              />
            </div>
          )}
          <div className="p-field p-col-12 p-md-12">
            <label htmlFor="description">{t('TEMPORAL_DESCRIPTION')}</label>
            <InputTextarea
              id="description"
              type="text"
              value={temporalCoverage.textual_description}
              rows={3}
              style={{ resize: 'none' }}
              onChange={(e) =>
                setTemporalCoverage(() => ({
                  ...temporalCoverage,
                  textual_description: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceCoverage;
