import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const sampleRepos = [
  { label: 'CG Space', value: 123 },
  { label: 'Dataverse (Harvard)', value: 425 },
];

const UploadToRepoDialog = ({ dialogOpen, setDialogOpen }) => {
  const { t } = useTranslation();
  const [selectedRepo, setSelectedRepo] = useState(null);

  return (
    <Dialog
      header={t('PUBLISH_RESOURCE')}
      visible={dialogOpen}
      style={{ width: '500px' }}
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-fluid">
        <div className="p-formgrid p-grid">
          <div className="p-col-12">
            <div className="p-field">
              <Dropdown
                options={sampleRepos}
                id="repo"
                placeholder={t('SELECT_TARGET_REPOSITORY')}
                value={selectedRepo}
                onChange={(e) => setSelectedRepo(e.value)}
              />
            </div>
          </div>
          <div className="p-col-12 p-text-center p-mt-3">
            <div className="p-d-inline-flex p-col-6 p-ai-center p-jc-center">
              <Button
                label={t('PUBLISH_RESOURCE')}
                icon="pi pi-upload"
                className="p-mr-2 p-mb-2"
                onClick={() => setDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UploadToRepoDialog;
