/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as countryOptions from '../../../data/countries/countries.json';

const ResourceCoverage = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState(initialData.geospatial_coverage || []);
  const [selectedCountry, setSelectedCountry] = useState('');

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
              {mode === 'edit' && (
                <Column
                  className="p-text-right"
                  body={(rowData) => (
                    <Button
                      className="p-button-danger"
                      icon="pi pi-trash"
                      onClick={() => {
                        setCountries(
                          countries.filter((item) => item.country_name !== rowData.country_name)
                        );
                      }}
                    />
                  )}
                />
              )}
            </DataTable>
          </div>
        </div>
        {mode === 'edit' && (
          <>
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
          </>
        )}
      </div>
    </Fieldset>
  );
};

export default ResourceCoverage;
