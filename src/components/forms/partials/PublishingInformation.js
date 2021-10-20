import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getEnglishValue } from '../../../utilities/transformers';
import DOIs from './DOIs';
import PIDs from './PIDs';

const PublishingInformation = ({ initialData, setter, mode, type }) => {
  const { t } = useTranslation();
  const [dois, setDois] = useState(initialData?.dois || []);
  const [pids, setPids] = useState(initialData?.pids || []);

  useEffect(() => {
    setter(dois, pids);
  }, [dois, pids]); // eslint-disable-line

  return (
    <Fieldset legend={t('PUBLISHING_INFORMATION')} className="p-mb-4">
      <DOIs mode={mode} title={getEnglishValue(initialData?.title)} dois={dois} setDois={setDois} />
      {type === 'document' && <PIDs mode={mode} pids={pids} setPids={setPids} />}
    </Fieldset>
  );
};

export default PublishingInformation;
