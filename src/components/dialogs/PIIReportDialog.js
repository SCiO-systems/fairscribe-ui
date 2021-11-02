import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPIIReport } from '../../services/resources';
import { ToastContext } from '../../store';
import { handleError } from '../../utilities/errors';

const PIIReportDialog = ({ dialogOpen, setDialogOpen, teamId, resourceId, fileId }) => {
  const { t } = useTranslation();
  const { setError } = useContext(ToastContext);

  const [data, setData] = useState([]);

  const loadReport = async () => {
    try {
      const { persons, geocoordinates } = await getPIIReport(teamId, resourceId, fileId);
      const combined = [
        ...persons,
        ...geocoordinates.map((c) => ({ Lemma: c.Coordinates, Class: 'COORDINATE' })),
      ];
      setData(combined);
    } catch (error) {
      setError(handleError(error));
    }
  };

  useEffect(() => {
    if (dialogOpen) {
      loadReport();
    }
  }, [dialogOpen]); // eslint-disable-line

  return (
    <Dialog
      header={t('PII_REPORT')}
      visible={dialogOpen}
      style={{ maxWidth: '750px' }}
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-grid p-fluid">
        <div className="p-col-12">
          <DataTable paginator rows={10} value={data} showGridlines>
            <Column sortable field="Lemma" header={t('LEMMA')} />
            <Column field="Class" header={t('CLASS')} />
          </DataTable>
        </div>
      </div>
    </Dialog>
  );
};

export default PIIReportDialog;
