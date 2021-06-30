import { PickList } from 'primereact/picklist';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ResourceCollectionsPicker = ({
  teamCollections,
  setTeamCollections,
  selectedCollections,
  setSelectedCollections,
}) => {
  const { t } = useTranslation();

  const onChangeCollections = ({ source, target }) => {
    setTeamCollections(source);
    setSelectedCollections(target);
  };

  return (
    <div className="p-fluid p-grid p-justify-start p-mt-2">
      <div className="p-col-12">
        <div className="p-field">
          <label htmlFor="resourceCollections">
            {t('RESOURCE_COLLECTIONS_TITLE')}
          </label>
          <PickList
            id="resourceCollections"
            source={teamCollections}
            target={selectedCollections}
            itemTemplate={(item) => item.title}
            onChange={onChangeCollections}
            showSourceControls={false}
            showTargetControls={false}
            sourceHeader={t('TEAM_COLLECTIONS')}
            targetHeader={t('RESOURCE_BELONGS_TO')}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceCollectionsPicker;
