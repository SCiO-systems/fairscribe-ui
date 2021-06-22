import React from 'react';
import { useTranslation } from 'react-i18next';
import PublishingInformation from './partials/PublishingInformation';
import ResourceFiles from './partials/ResourceFiles';
import ResourceGeneralInformation from './partials/ResourceGeneralInformation';

const EditResourceForm = ({ resourceId }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="p-mt-4 p-text-uppercase">
        {t('RESOURCE_METADATA_RECORD')}
      </h4>
      <ResourceFiles />
      <PublishingInformation />
      <ResourceGeneralInformation />
    </div>
  );
};

export default EditResourceForm;
