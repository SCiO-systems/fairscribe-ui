import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserTargetedRepositories = () => {
  // TODO: Default false.
  // eslint-disable-next-line
  const { t } = useTranslation();

  return (
    <div className="p-grid p-my-3">
      <div className="p-col-12">
        <div className="card p-fluid p-shadow-4 rounded">
          <h5>{t('USER_TARGETED_REPOSITORIES_TITLE')}</h5>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTargetedRepositories;
