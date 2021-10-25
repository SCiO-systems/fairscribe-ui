import { Fieldset } from 'primereact/fieldset';
import { TreeSelect } from 'primereact/treeselect';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import countryMappings from '../../../data/geospatial/countries.json';
import geospatialData from '../../../data/geospatial/geospatial.json';
import regionMappings from '../../../data/geospatial/regions.json';

const GeospatialCoverage = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  const isRegion = (code) => regionMappings[code] !== undefined;

  useEffect(() => {
    const keys = {};
    initialData?.countries?.forEach(({ code_UNM49: code, checked, partialChecked }) => {
      keys[code] = { checked, partialChecked };
    });
    initialData?.regions?.forEach(({ code, checked, partialChecked }) => {
      keys[code] = { checked, partialChecked };
    });
    setSelectedKeys(keys);
  }, []); // eslint-disable-line

  useEffect(() => {
    const countries = [];
    const regions = [];
    Object.keys(selectedKeys).forEach((code) => {
      if (isRegion(code)) {
        regions.push({ ...selectedKeys[code], value: regionMappings[code], code });
      } else {
        countries.push({
          ...selectedKeys[code],
          value: countryMappings[code]?.name,
          code_ISO3166_1_a2: countryMappings[code]?.code_ISO3166_1_a2,
          code_ISO3166_1_a3: countryMappings[code]?.code_ISO3166_1_a3,
          code_UNM49: code,
        });
      }
    });
    setter(regions, countries);
  }, [selectedKeys]); // eslint-disable-line

  return (
    <Fieldset legend={t('GEOSPATIAL_COVERAGE')} className="p-mb-4">
      <TreeSelect
        filter
        disabled={mode !== 'edit'}
        value={selectedKeys}
        display="chip"
        onChange={(e) => setSelectedKeys(e.value)}
        selectionMode="checkbox"
        options={geospatialData}
        placeholder={t('SELECT_REGIONS_COUNTRIES')}
      />
    </Fieldset>
  );
};

export default GeospatialCoverage;
