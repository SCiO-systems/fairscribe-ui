import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { InputSwitch } from 'primereact/inputswitch';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import placeholderImage from '../../../assets/img/placeholder.png';
import {
  deleteFile,
  uploadFile,
  uploadThumbnail,
} from '../../../services/resources';
import { ToastContext } from '../../../store/toast';

const ResourceFiles = ({ initialData, setter, mode }) => {
  const { t } = useTranslation();
  const { setError, setSuccess } = useContext(ToastContext);
  const thumbnailFile = useRef(null);
  const resourceFile = useRef(null);
  const [resourceFiles, setResourceFiles] = useState(
    initialData.resource_files || []
  );
  const [thumbnails, setThumbnails] = useState(initialData.thumbnail || []);
  const { teamId, resourceId } = useParams();

  const handleError = (e) => {
    let error = e && e.message;
    const statusCode = e.response && e.response.status;
    error =
      statusCode === 422
        ? e.response.data.errors[Object.keys(e.response.data.errors)[0]][0]
        : e.response.data.error;
    setError('Error', error);
  };

  const uploadResourceFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await uploadFile(teamId, resourceId, formData);
      setSuccess('Resource File', 'Your file has been uploaded.');
      setResourceFiles(resourceFiles.concat({ ...data }));
    } catch (error) {
      handleError(error);
    }
  };

  const deleteResourceFile = async (id) => {
    try {
      await deleteFile(teamId, resourceId, id);
      setSuccess('Resource File', 'The file has been deleted.');
      setResourceFiles(resourceFiles.filter((item) => item.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  const uploadResourceThumbnail = async (thumbnail) => {
    const formData = new FormData();
    formData.append('file', thumbnail);
    try {
      const { data } = await uploadThumbnail(teamId, resourceId, formData);
      setSuccess('Resource Thumbnail', 'Your thumbnail has been uploaded.');
      setThumbnails(thumbnails.concat({ ...data }));
    } catch (error) {
      handleError(error);
    }
  };

  const setPublishable = async (id, publishable) => {
    const f = resourceFiles.map((item) => {
      if (item.id === id) {
        return { ...item, publishable };
      }
      return item;
    });
    setResourceFiles(f);
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

  const getDateFromFormat = (value) => {
    if (value instanceof Date) {
      return value;
    }
    // Format is yyyy-MM-dd;
    const d = new Date(value);
    return d;
  };

  const convertDateToFormat = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().split('T')[0];
  };

  const setEmbargoDate = async (id, date) => {
    const f = resourceFiles.map((item) => {
      if (item.id === id) {
        return { ...item, embargo_date: date };
      }
      return item;
    });
    setResourceFiles(f);
  };

  const getThumbnailURL = (path) => {
    const u = new URL(process.env.REACT_APP_API_BASE_URL);
    return `${u.origin}/storage/${path}`;
  };

  useEffect(() => {
    const files = resourceFiles.map((item) => ({
      ...item,
      embargo_date: item.embargo_date,
    }));
    setter(thumbnails, files);
  }, [resourceFiles, thumbnails]); // eslint-disable-line

  return (
    <Fieldset
      legend={t('RESOURCE_FILES')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <div>
        {thumbnails && thumbnails.length > 0 ? (
          <img
            src={getThumbnailURL(thumbnails[0].path)}
            height="127px"
            className="rounded"
            alt="Resource Thumbnail"
          />
        ) : (
          <img
            src={placeholderImage}
            height="127px"
            className="rounded"
            alt="Resource Thumbnail"
          />
        )}
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
      >
        <Column field="filename" header={t('FILE_NAME')} />
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
              checked={locked}
              onChange={(e) => setLocked(id, e.value)}
            />
          )}
        />
        <Column
          file="publishable"
          header={t('PUBLISHABLE')}
          body={({ id, publishable }) => (
            <InputSwitch
              disabled={mode === 'review'}
              className="p-my-0 p-py-0"
              checked={publishable}
              onChange={(e) => setPublishable(id, e.value)}
            />
          )}
        />
        <Column
          field="embargo_date"
          header={t('EMBARGO_DATE')}
          body={(rowData) => (
            <Calendar
              dateFormat="yy-mm-dd"
              showIcon
              disabled={mode === 'review'}
              showButtonBar
              id="embargo-date"
              value={getDateFromFormat(rowData.embargo_date)}
              onChange={(e) => setEmbargoDate(rowData.id, e.value)}
            />
          )}
        />
        {mode === 'edit' && (
          <Column
            header={t('ACTIONS')}
            body={(rowData) => (
              <div className="p-text-left">
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
