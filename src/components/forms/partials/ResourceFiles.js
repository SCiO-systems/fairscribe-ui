/* eslint-disable no-new */
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { InputSwitch } from 'primereact/inputswitch';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import placeholderImage from '../../../assets/img/placeholder.png';
import { getMimetype } from '../../../services/integrations';
import {
  acceptPIITerms,
  deleteFile,
  getThumbnailURL,
  uploadFile,
  uploadThumbnail,
} from '../../../services/resources';
import { ToastContext } from '../../../store/toast';
import { handleError } from '../../../utilities/errors';
import SimpleTextArea from '../../fields/SimpleTextArea';
import PIIStatusTemplate from './PIIStatusTemplate';

const ResourceFiles = ({ initialData, setter, mode, teamId, resourceId, onSave }) => {
  const { t } = useTranslation();
  const { setError, setSuccess } = useContext(ToastContext);
  const thumbnailFile = useRef(null);
  const resourceFile = useRef(null);
  const [resourceFiles, setResourceFiles] = useState(initialData?.resource_files || []);
  const [thumbnails, setThumbnails] = useState(initialData?.thumbnails || []);
  const [thumbnailUrl, setThumbnailUrl] = useState(placeholderImage);
  const [uploadThumbPending, setUploadThumbPending] = useState(false);
  const [uploadFilePending, setUploadFilePending] = useState(false);
  const [deleteFilePending, setDeleteFilePending] = useState(false);
  const [deleteFileId, setDeleteFileId] = useState(null);

  const uploadResourceFile = async (file) => {
    setUploadFilePending(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await uploadFile(teamId, resourceId, formData);
      const response = await getMimetype(data.filename);
      setSuccess('Resource File', 'Your file has been uploaded.');
      setResourceFiles(
        resourceFiles.concat({
          id: data.id,
          filename: data.filename,
          mime_type: response.mime_type,
          pii_check: data.pii_check_status,
          location: [
            {
              url: data.url,
            },
          ],
        })
      );
    } catch (error) {
      setError(handleError(error));
    }
    setUploadFilePending(false);
  };

  const deleteResourceFile = async (id) => {
    setDeleteFileId(id);
    setDeleteFilePending(true);
    try {
      await deleteFile(teamId, resourceId, id);
      setSuccess('Resource File', 'The file has been deleted.');
      setResourceFiles(resourceFiles.filter((item) => item.id !== id));
    } catch (error) {
      setError(handleError(error));
    }
    setDeleteFilePending(false);
    setDeleteFileId(null);
  };

  const uploadResourceThumbnail = async (thumbnail) => {
    setUploadThumbPending(true);
    const formData = new FormData();
    formData.append('file', thumbnail);
    try {
      const { data } = await uploadThumbnail(teamId, resourceId, formData);
      setSuccess('Resource Thumbnail', 'Your thumbnail has been uploaded.');
      setThumbnails([{ url: data?.url, id: data?.id }]);
      setThumbnailUrl(data?.url);
    } catch (error) {
      setError(handleError(error));
    }
    setUploadThumbPending(false);
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

  const acceptTerms = async (id) => {
    try {
      const { data } = await acceptPIITerms(teamId, resourceId, id);
      const f = resourceFiles.map((item) => {
        if (item.id === id) {
          return { ...item, pii_terms_accepted_at: data.pii_terms_accepted_at };
        }
        return item;
      });
      setResourceFiles(f);
    } catch (error) {
      setError(handleError(error));
    }
  };

  useEffect(() => {
    if (thumbnails.length > 0) {
      loadThumbnails(teamId, resourceId, thumbnails[0]);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    setter(thumbnails, resourceFiles);
  }, [resourceFiles, thumbnails]); // eslint-disable-line

  return (
    <Fieldset legend={t('RESOURCE_FILES')} className="p-mb-4">
      <div>
        <img src={thumbnailUrl} height="127px" className="rounded" alt="Resource Thumbnail" />
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
                loading={uploadThumbPending}
                className="p-mt-2 p-mb-2"
                onClick={() => thumbnailFile.current.click()}
              />
            )}
          </div>
        </div>
      </div>
      <DataTable
        id="resource-files"
        header={t('PHYSICAL_FILES')}
        emptyMessage=""
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
          body={({ description }) => (
            <SimpleTextArea mode={mode} text={description} setText={setDescription} />
          )}
        />
        <Column
          field="pii_check"
          header={t('PII_STATUS')}
          body={({ id, pii_check: status, pii_terms_accepted_at: acceptedAt }) => (
            <PIIStatusTemplate
              status={status}
              termsAccepted={typeof acceptedAt === 'string'}
              setTermsAccepted={() => acceptTerms(id)}
              teamId={teamId}
              resourceId={resourceId}
              fileId={id}
            />
          )}
        />
        <Column
          field="locked"
          header={t('LOCKED')}
          body={({ id, locked }) => (
            <InputSwitch
              disabled={mode === 'review' || mode === 'view'}
              className="p-my-0 p-py-0"
              checked={locked || false}
              onChange={(e) => setLocked(id, e.value)}
            />
          )}
        />
        {mode === 'edit' && (
          <Column
            header={t('ACTIONS')}
            body={({ id }) => (
              <div className="p-text-right">
                <Button
                  icon="pi pi-trash"
                  loading={deleteFilePending && id === deleteFileId}
                  className="p-button p-component p-button-danger p-button-icon-only"
                  onClick={() => {
                    setDeleteFileId(id);
                    deleteResourceFile(id);
                  }}
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
              loading={uploadFilePending}
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
