/* eslint-disable no-console */
import { Fieldset } from 'primereact/fieldset';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ResourceLifecycle = () => {
  const { t } = useTranslation();

  return (
    <Fieldset legend={t('RESOURCE_LIFECYCLE')} className="p-mb-4">
      1
    </Fieldset>
  );
};

export default ResourceLifecycle;
