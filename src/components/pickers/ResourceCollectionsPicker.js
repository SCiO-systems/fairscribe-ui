import { PickList } from 'primereact/picklist';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ResourceCollectionsPicker = ({ resourceCollections }) => {
  const { t } = useTranslation();
  const [collections, setCollections] = useState(resourceCollections || []);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const onChangeCollections = ({ source, target }) => {
    setCollections(source);
    setSelectedCollections(target);
  };

  return (
    <div className="p-fluid p-grid p-justify-start p-mt-2">
      <div className="p-col-12 p-md-6 p-lg-12">
        <div className="p-field">
          <label htmlFor="resourceCollections">
            {t('RESOURCE_COLLECTIONS_TITLE')}
          </label>
          <PickList
            id="resourceCollections"
            source={collections}
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
