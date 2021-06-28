/* eslint-disable no-console */
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ResourceCoverage = ({ projectCoverage }) => {
  const { t } = useTranslation();

  return (
    <Fieldset
      legend={t('RESOURCE_COVERAGE')}
      style={{ position: 'relative' }}
      className="relative p-mb-4"
    >
      <Button
        style={{ position: 'absolute', top: '-0.2rem', right: '1.6rem' }}
        label={t('CHECK_FAIR')}
      />
    </Fieldset>
  );
};

export default ResourceCoverage;
