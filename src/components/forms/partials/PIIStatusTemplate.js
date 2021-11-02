import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PIIReportDialog from '../../dialogs/PIIReportDialog';

const PIIStatusTemplate = ({
  status,
  termsAccepted,
  setTermsAccepted,
  teamId,
  resourceId,
  fileId,
}) => {
  const { t } = useTranslation();

  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  return (
    <div className="p-mx-1">
      {!status && (
        <span className="p-d-flex p-ai-center" style={{ textTransform: 'capitalize' }}>
          N/A
        </span>
      )}
      {status === 'pending' && (
        <span className="p-d-flex p-ai-center" style={{ textTransform: 'capitalize' }}>
          <i style={{ fontSize: '1.25rem' }} className="pi pi-spin pi-spinner p-mr-2" />
          {status}
        </span>
      )}
      {status === 'fail' && (
        <div>
          <div className="p-grid p-d-flex p-ai-center">
            <div className="p-col-12 p-md-12 p-lg-4 p-pb-0">
              <span
                className="p-d-flex text-red p-ai-center"
                style={{ textTransform: 'capitalize' }}
              >
                <i className="pi pi-times text-red bg-red rounded-full p-p-1 p-mr-2" />
                {status}
              </span>
            </div>
            <div className="p-col-12 p-md-12 p-lg-8 p-pb-0">
              <Button
                className="p-button-sm p-button-rounded p-button-warning"
                icon="pi pi-exclamation-triangle"
                label={t('VIEW_REPORT')}
                onClick={() => setReportDialogOpen(true)}
              />
            </div>
          </div>
          <div className="p-mt-3">
            <Checkbox
              inputId="termsCheck"
              checked={termsAccepted}
              disabled={termsAccepted}
              onChange={(e) => setTermsAccepted(e.checked)}
            />
            <label htmlFor="termsCheck" className="p-checkbox-label cursor-pointer p-ml-2">
              <strong>Ignore PII check results:</strong> I consent that all actions have been taken
              so as not to have PII issues with the uploaded data.
            </label>
          </div>
        </div>
      )}
      {status === 'pass' && (
        <span className="p-d-flex text-green p-ai-center" style={{ textTransform: 'capitalize' }}>
          <i className="pi pi-check text-green bg-green rounded-full p-p-1 p-mr-2" />
          {status}
        </span>
      )}
      <PIIReportDialog
        dialogOpen={reportDialogOpen}
        setDialogOpen={setReportDialogOpen}
        teamId={teamId}
        resourceId={resourceId}
        fileId={fileId}
      />
    </div>
  );
};

export default PIIStatusTemplate;
