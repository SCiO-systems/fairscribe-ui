import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateResource } from '../../services/resources';
import { ToastContext } from '../../store';
import { handleError } from '../../utilities/errors';

const sampleRepos = [
  { label: 'Dspace', value: 123 },
  { label: 'Dataverse', value: 425 },
];

// TODO: Refactor (onFilter) in the future.
const UploadToRepoDialog = ({ dialogOpen, setDialogOpen, teamId, resource, onFilter }) => {
  const { t } = useTranslation();
  const [selectedRepo, setSelectedRepo] = useState('');
  const { setError, setSuccess } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = async (status) => {
    setIsLoading(true);
    try {
      const { collections } = resource;
      await updateResource(teamId, resource?.id, {
        status,
        collections: collections.map(({ id }) => id),
      });
      setSuccess('Resource', 'Resource has been published!');
    } catch (error) {
      setError(handleError(error));
    }
    setIsLoading(false);
    if (onFilter) onFilter();
  };

  return (
    <Dialog
      header={t('PUBLISH_RESOURCE')}
      visible={dialogOpen}
      style={{ width: '500px' }}
      draggable={false}
      modal
      onHide={() => {
        setSelectedRepo('');
        setDialogOpen(false);
      }}
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
                loading={isLoading}
                disabled={selectedRepo === ''}
                onClick={() => {
                  setSelectedRepo('');
                  updateStatus('published');
                  setDialogOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UploadToRepoDialog;
