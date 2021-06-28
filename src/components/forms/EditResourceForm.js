import { Button } from 'primereact/button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import PublishingInformation from './partials/PublishingInformation';
import ResourceFiles from './partials/ResourceFiles';
import ResourceGeneralInformation from './partials/ResourceGeneralInformation';
import ResourceLifecycle from './partials/ResourceLifecycle';

const EditResourceForm = ({ resourceId, teamId }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="p-pb-6">
      <div className="p-d-flex p-jc-between">
        <h4 className="p-text-uppercase">{t('RESOURCE_METADATA_RECORD')}</h4>
        <div>
          <Button
            label={t('CANCEL')}
            onClick={() => history.push(`/teams/${teamId}`)}
            className="p-button-secondary p-mr-2"
          />
          <Button
            label={t('SAVE_CHANGES')}
            onClick={() => console.log('done & done')}
          />
        </div>
      </div>
      <ResourceFiles />
      <PublishingInformation />
      <ResourceGeneralInformation />
      <ResourceLifecycle />
    </div>
  );
};

export default EditResourceForm;
