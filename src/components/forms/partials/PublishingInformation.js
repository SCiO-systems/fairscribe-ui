import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DOIs from './DOIs';
import PIDs from './PIDs';

const PublishingInformation = ({ initialData, setter, mode, type }) => {
  const { t } = useTranslation();
  const [dois, setDois] = useState(initialData?.dois || []);
  const [pids, setPids] = useState(initialData?.pids || []);

  const getEnglishTitle = () =>
    initialData?.title?.filter(({ language }) => language?.value === 'English')?.pop()?.value || '';

  useEffect(() => {
    setter(dois, pids);
  }, [dois, pids]); // eslint-disable-line

  return (
    <Fieldset
      legend={t('PUBLISHING_INFORMATION')}
      className="p-mb-4"
      style={{ position: 'relative' }}
    >
      <DOIs mode={mode} title={getEnglishTitle()} dois={dois} setDois={setDois} />
      {type === 'document' && <PIDs mode={mode} pids={pids} setPids={setPids} />}
    </Fieldset>
  );
};

export default PublishingInformation;
