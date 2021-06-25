import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import PublishingInformation from './partials/PublishingInformation';
import ResourceFiles from './partials/ResourceFiles';
import ResourceGeneralInformation from './partials/ResourceGeneralInformation';

const EditResourceForm = ({ resourceId, teamId }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div>
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
    </div>
  );
};

export default EditResourceForm;
