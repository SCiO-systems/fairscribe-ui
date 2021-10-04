import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { InputSwitch } from 'primereact/inputswitch';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import placeholderImage from '../../../assets/img/placeholder.png';
import {
  deleteFile,
  getThumbnailURL,
  uploadFile,
  uploadThumbnail,
} from '../../../services/resources';
import { ToastContext } from '../../../store/toast';
import { handleError } from '../../../utilities/errors';
import { useDebounce } from '../../../utilities/hooks';

const ResourceFiles = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const { setError, setSuccess } = useContext(ToastContext);
  const thumbnailFile = useRef(null);
  const resourceFile = useRef(null);
  const [resourceFiles, setResourceFiles] = useState(
    initialData?.resource_files || []
  );
  const [thumbnails, setThumbnails] = useState(initialData?.thumbnail || []);
  const [thumbnailUrl, setThumbnailUrl] = useState(placeholderImage);
  const { teamId, resourceId } = useParams();
  const debouncedResourceFiles = useDebounce(resourceFiles, 300);
  const debouncedThumbnails = useDebounce(thumbnails, 300);

  const uploadResourceFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await uploadFile(teamId, resourceId, formData);
      setSuccess('Resource File', 'Your file has been uploaded.');
      setResourceFiles(resourceFiles.concat({ ...data }));
    } catch (error) {
      setError(handleError(error));
    }
  };

  const deleteResourceFile = async (id) => {
    try {
      await deleteFile(teamId, resourceId, id);
      setSuccess('Resource File', 'The file has been deleted.');
      setResourceFiles(resourceFiles.filter((item) => item.id !== id));
    } catch (error) {
      setError(handleError(error));
    }
  };

  const uploadResourceThumbnail = async (thumbnail) => {
    const formData = new FormData();
    formData.append('file', thumbnail);
    try {
      const { data } = await uploadThumbnail(teamId, resourceId, formData);
      setSuccess('Resource Thumbnail', 'Your thumbnail has been uploaded.');
      setThumbnails(thumbnails.concat({ ...data }));
      setThumbnailUrl(data?.url);
    } catch (error) {
      setError(handleError(error));
    }
  };

  const loadThumbnails = async (team, resource, thumb) => {
    try {
      const { data } = await getThumbnailURL(team, resource, thumb?.id);
      setThumbnailUrl(data?.url);
    } catch (error) {
      setError(handleError(error));
      setThumbnailUrl(placeholderImage);
    }
  };

  const setLocked = async (id, locked) => {
    const f = resourceFiles.map((item) => {
      if (item.id === id) {
        return { ...item, locked };
      }
      return item;
    });
    setResourceFiles(f);
  };

  const setDescription = async (id, description) => {
    const f = resourceFiles.map((item) => {
      if (item.id === id) {
        return { ...item, description };
      }
      return item;
    });
    setResourceFiles(f);
  };

  useEffect(() => {
    if (thumbnails.length > 0) {
      loadThumbnails(teamId, resourceId, thumbnails[0]);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    setter(thumbnails, resourceFiles);
  }, [debouncedResourceFiles, debouncedThumbnails]); // eslint-disable-line

  return (
    <Fieldset
      legend={t('RESOURCE_FILES')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <div>
        <img
          src={thumbnailUrl}
          height="127px"
          className="rounded"
          alt="Resource Thumbnail"
        />
        <div className="p-formgrid p-grid">
          <div className="p-col-12 p-mt-2">
            <input
              type="file"
              className="hidden"
              id="thumbnail"
              multiple={false}
              ref={thumbnailFile}
              onChange={(e) => {
                uploadResourceThumbnail(e.target.files[0]);
                e.target.value = null;
              }}
            />
            {mode === 'edit' && (
              <Button
                label={t('UPLOAD_THUMBNAIL')}
                icon="pi pi-image"
                className="p-mt-2 p-mb-2"
                onClick={() => thumbnailFile.current.click()}
              />
            )}
          </div>
        </div>
      </div>
      <DataTable
        header={t('PHYSICAL_FILES')}
        emptyMessage={t('NO_ENTRIES_FOUND')}
        value={resourceFiles}
        className="p-mt-4"
        showGridlines
        resizableColumns
        columnResizeMode="expand"
      >
        <Column field="filename" header={t('FILE_NAME')} />
        <Column
          field="description"
          header={t('DESCRIPTION')}
          body={({ id, description }) => (
            <InputTextarea
              rows={2}
              disabled={mode === 'review'}
              className="p-my-0 p-d-inline-flex w-full text-xs"
              value={description || ''}
              onChange={(e) => setDescription(id, e.target.value)}
            />
          )}
        />
        <Column field="extension" header={t('EXTENSION')} />
        <Column field="mime_type" header={t('MIME_TYPE')} />
        <Column field="pii_check" header={t('PII_STATUS')} />
        <Column
          field="locked"
          header={t('LOCKED')}
          body={({ id, locked }) => (
            <InputSwitch
              disabled={mode === 'review'}
              className="p-my-0 p-py-0"
              checked={locked || false}
              onChange={(e) => setLocked(id, e.value)}
            />
          )}
        />
        {mode === 'edit' && (
          <Column
            header={t('ACTIONS')}
            body={(rowData) => (
              <div className="p-text-right">
                <Button
                  icon="pi pi-trash"
                  className="p-button p-component p-button-danger p-button-icon-only"
                  onClick={() => deleteResourceFile(rowData.id)}
                />
              </div>
            )}
          />
        )}
      </DataTable>
      <div className="p-formgrid p-grid">
        <div className="p-field p-col-12">
          <input
            className="hidden"
            type="file"
            multiple={false}
            ref={resourceFile}
            onChange={(e) => {
              uploadResourceFile(e.target.files[0]);
              e.target.value = null;
            }}
          />
          {mode === 'edit' && (
            <Button
              label={t('UPLOAD_FILES')}
              className="p-mt-4"
              icon="pi pi-upload"
              onClick={(e) => resourceFile.current.click()}
            />
          )}
        </div>
      </div>
    </Fieldset>
  );
};

export default ResourceFiles;
