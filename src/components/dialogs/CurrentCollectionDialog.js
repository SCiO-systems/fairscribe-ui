import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createTeamCollection,
  updateTeamCollection,
} from '../../services/collections';
import { ToastContext } from '../../store';

const CurrentCollectionDialog = ({
  dialogOpen,
  setDialogOpen,
  collection,
  team,
}) => {
  const { t } = useTranslation();
  const { setError, setSuccess } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState((collection && collection.title) || '');
  const [description, setDescription] = useState(
    (collection && collection.description) || ''
  );

  useEffect(() => {
    if (collection && collection.title && collection.description) {
      setTitle(collection.title);
      setDescription(collection.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [collection]);

  const handleError = (e) => {
    let error = e && e.message;
    const statusCode = e.response && e.response.status;
    error =
      statusCode === 422
        ? e.response.data.errors[Object.keys(e.response.data.errors)[0]][0]
        : e.response.data.error;
    setError('Error', error);
  };

  const createCollection = async () => {
    await createTeamCollection(team.id, {
      title,
      description,
    });
  };

  const updateCollection = async () => {
    await updateTeamCollection(team.id, collection.id, {
      title,
      description,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (collection && collection.title) {
        await updateCollection();
        setSuccess('Collection', 'The collection has been updated!');
      } else {
        await createCollection();
        setSuccess('Collection', 'The collection has been created!');
      }
      setTitle('');
      setDescription('');
      setDialogOpen(false);
    } catch (error) {
      handleError(error);
    }
    setIsLoading(false);
  };

  return (
    <Dialog
      header={collection ? t('EDIT_COLLECTION') : t('CREATE_A_NEW_COLLECTION')}
      visible={dialogOpen}
      style={{ width: '400px' }}
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-fluid">
        <form onSubmit={handleSubmit}>
          <div className="p-formgrid p-grid">
            <div className="p-col-12 p-field">
              <label htmlFor="title">{t('COLLECTION_TITLE')}</label>
              <InputText
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-col-12 p-field">
              <label htmlFor="title">{t('COLLECTION_DESCRIPTION')}</label>
              <InputText
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-col-12 p-text-center p-mt-2">
              <div className="p-d-inline-flex p-ai-center p-jc-center">
                <Button
                  icon={collection ? 'pi pi-save' : 'pi pi-plus'}
                  type="submit"
                  label={
                    collection
                      ? t('SAVE_COLLECTION_BUTTON')
                      : t('CREATE_COLLECTION_BUTTON')
                  }
                  className="p-mr-2 p-mb-2"
                  loading={isLoading}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default CurrentCollectionDialog;
