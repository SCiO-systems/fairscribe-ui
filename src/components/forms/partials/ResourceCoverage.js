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
      WIP
    </Fieldset>
  );
};

export default ResourceCoverage;
