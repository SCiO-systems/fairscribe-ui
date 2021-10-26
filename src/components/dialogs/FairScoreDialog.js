import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateFairScore } from '../../services/resources';
import { ToastContext } from '../../store';
import { handleError } from '../../utilities/errors';

const FairScoreDialog = ({ dialogOpen, setDialogOpen, teamId, resourceId }) => {
  const { t } = useTranslation();

  const [fairScore, setFairScore] = useState({});
  const { setError } = useContext(ToastContext);

  const loadFairScore = async () => {
    try {
      const response = await calculateFairScore(teamId, resourceId);
      setFairScore(response);
    } catch (error) {
      setError(handleError(error));
    }
  };

  useEffect(() => {
    if (teamId && resourceId && dialogOpen) {
      loadFairScore();
    }
  }, [dialogOpen]); // eslint-disable-line

  const meetsConditionTemplate = ({ meetsCondition }) => (
    <div className="p-text-center">
      {meetsCondition ? (
        <span>
          <i className="pi pi-check text-green bg-green rounded-full p-p-1" />
        </span>
      ) : (
        <span>
          <i className="pi pi-times text-red bg-red rounded-full p-p-1" />
        </span>
      )}
    </div>
  );

  const headerTemplate = (title, score) => (
    <div className="p-d-flex p-jc-between p-ai-center">
      <span>{title}</span>
      <span>Score: {score} (max 5 points)</span>
    </div>
  );

  return (
    <Dialog
      header={t('FAIR_SCORING')}
      visible={dialogOpen}
      style={{ maxWidth: '90%' }}
      maximized
      draggable={false}
      modal
      onHide={() => setDialogOpen(false)}
    >
      <div className="p-grid p-fluid">
        <div className="p-col-12 p-text-center">
          <DataTable
            className="fairscore-dt p-mb-5"
            dataKey="metadata"
            header={headerTemplate(t('FINDABLE'), fairScore?.findable?.score)}
            value={fairScore?.findable?.rules || []}
            rowGroupMode="rowspan"
            sortField="category"
            showGridlines
          >
            <Column field="metadataCondition" header={t('METADATA_PROPERTY_CONDITION')} />
            <Column style={{ textAlign: 'center' }} field="scoring" header={t('SCORING_IN_FAIR')} />
            <Column body={meetsConditionTemplate} header={t('RESOURCE_MEETS_CONDITION')} />
            <Column field="recommendation" header={t('RECOMMENDATION')} />
          </DataTable>
          <DataTable
            className="fairscore-dt p-mb-5"
            dataKey="metadata"
            header={headerTemplate(t('ACCESSIBLE'), fairScore?.accessible?.score)}
            value={fairScore?.accessible?.rules || []}
            rowGroupMode="rowspan"
            sortField="category"
            showGridlines
          >
            <Column field="metadataCondition" header={t('METADATA_PROPERTY_CONDITION')} />
            <Column style={{ textAlign: 'center' }} field="scoring" header={t('SCORING_IN_FAIR')} />
            <Column body={meetsConditionTemplate} header={t('RESOURCE_MEETS_CONDITION')} />
            <Column field="recommendation" header={t('RECOMMENDATION')} />
          </DataTable>
          <DataTable
            className="fairscore-dt p-mb-5"
            dataKey="metadata"
            header={headerTemplate(t('INTEROPERABLE'), fairScore?.interoperable?.score)}
            value={fairScore?.interoperable?.rules || []}
            rowGroupMode="rowspan"
            sortField="category"
            showGridlines
          >
            <Column field="metadataCondition" header={t('METADATA_PROPERTY_CONDITION')} />
            <Column style={{ textAlign: 'center' }} field="scoring" header={t('SCORING_IN_FAIR')} />
            <Column body={meetsConditionTemplate} header={t('RESOURCE_MEETS_CONDITION')} />
            <Column field="recommendation" header={t('RECOMMENDATION')} />
          </DataTable>
          <DataTable
            className="fairscore-dt p-mb-5"
            dataKey="metadata"
            header={headerTemplate(t('REUSABLE'), fairScore?.reusable?.score)}
            value={fairScore?.reusable?.rules || []}
            rowGroupMode="rowspan"
            sortField="category"
            showGridlines
          >
            <Column field="metadataCondition" header={t('METADATA_PROPERTY_CONDITION')} />
            <Column style={{ textAlign: 'center' }} field="scoring" header={t('SCORING_IN_FAIR')} />
            <Column body={meetsConditionTemplate} header={t('RESOURCE_MEETS_CONDITION')} />
            <Column field="recommendation" header={t('RECOMMENDATION')} />
          </DataTable>
        </div>
      </div>
    </Dialog>
  );
};

export default FairScoreDialog;
