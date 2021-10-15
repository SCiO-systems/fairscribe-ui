import { PickList } from 'primereact/picklist';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ResourceCollectionsPicker = ({
  mode,
  teamCollections,
  setTeamCollections,
  selectedCollections,
  setSelectedCollections,
}) => {
  const { t } = useTranslation();

  const onChangeCollections = ({ source, target }) => {
    if (mode === 'edit') {
      setTeamCollections(source);
      setSelectedCollections(target);
    }
  };

  return (
    <div className="p-fluid p-grid p-justify-start p-mt-2">
      <div className="p-col-12">
        <div className="p-field ">
          <label htmlFor="resourceCollections">{t('RESOURCE_COLLECTIONS_TITLE')}</label>
          <div className="relative">
            {mode === 'review' && (
              <div
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  background: 'rgba(255,255,255,0.25)',
                }}
              />
            )}
            <PickList
              disabled
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
    </div>
  );
};

export default ResourceCollectionsPicker;
