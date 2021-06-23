import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRepositories, getRepositoryTypes } from '../services/user';

const typeTemplate = (rowData) => <div>{rowData.type}</div>;
const nameTemplate = (rowData) => <div>{rowData.name}</div>;
const endpointTemplate = (rowData) => <div>{rowData.api_endpoint}</div>;
const connectionTemplate = (rowData) => (
  <div className="p-text-center">
    {rowData.connection_verified ? (
      <i
        className="pi pi-check text-green bg-green rounded-full p-p-1"
        style={{ fontSize: '1rem' }}
      />
    ) : (
      <i
        className="pi pi-times text-red bg-red rounded-full p-p-1"
        style={{ fontSize: '1rem' }}
      />
    )}
  </div>
);

const UserTargetedRepositories = ({ userId }) => {
  // TODO: Default false.
  // eslint-disable-next-line
  const { t } = useTranslation();
  const [repositories, setRepositories] = useState([]);
  const [repositoryTypes, setRepositoryTypes] = useState([]);
  const [repositoryType, setRepositoryType] = useState([]);
  const [repositoryName, setRepositoryName] = useState('');
  const [repositoryEndpoint, setRepositoryEndpoint] = useState('');
  const [repositoryClientSecret, setRepositoryClientSecret] = useState('');

  const fetchRepositoryTypes = async () => {
    try {
      const { data: types } = await getRepositoryTypes();
      setRepositoryTypes(
        types.map((type) => ({ label: type.name, value: type.value })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserRepositories = async () => {
    try {
      const { data } = await getRepositories(userId);
      setRepositories(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchUserRepositories(), fetchRepositoryTypes()]);
  }, []);

  const addRepository = (name, type, endpoint) => {
    setRepositories(repositories.concat({ name, type, connection: true }));
    setRepositoryName('');
    setRepositoryType(repositoryTypes[0] || null);
    setRepositoryEndpoint('');
    setRepositoryClientSecret('');
  };

  return (
    <div className="p-grid p-mt-1 p-mb-3">
      <div className="p-col-12">
        <div className="card p-fluid p-shadow-4 rounded">
          <h5>{t('USER_TARGETED_REPOSITORIES_TITLE')}</h5>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-12">
              {repositories && repositories.length > 0 ? (
                <DataTable value={repositories} className="p-mt-2">
                  <Column
                    field="name"
                    header={t('REPOSITORY_NAME')}
                    body={nameTemplate}
                  />
                  <Column
                    field="type"
                    header={t('REPOSITORY_TYPE')}
                    body={typeTemplate}
                  />
                  <Column
                    field="api_endpoint"
                    header={t('REPOSITORY_API_ENDPOINT')}
                    body={endpointTemplate}
                  />
                  <Column
                    field="connection"
                    header={t('REPOSITORY_CONNECTION_VERIFIED')}
                    body={connectionTemplate}
                  />
                </DataTable>
              ) : (
                <p>{t('NO_REPOSITORIES_FOUND')}</p>
              )}
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start p-mt-3">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="ui-language">{t('REPOSITORY_TYPE')}</label>
              <Dropdown
                id="ui-language"
                value={repositoryType}
                options={repositoryTypes}
                onChange={(e) => setRepositoryType(e.value)}
                placeholder={t('SELECT_REPOSITORY_TYPE')}
                className="p-d-flex"
              />
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="repositoryName">{t('REPOSITORY_NAME')}</label>
              <InputText
                id="repositoryName"
                type="text"
                value={repositoryName}
                onChange={(e) => setRepositoryName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="repositoryEndpoint">
                {t('REPOSITORY_API_ENDPOINT')}
              </label>
              <InputText
                id="repositoryEndpoint"
                type="text"
                value={repositoryEndpoint}
                placeholder="https://example.com/api"
                onChange={(e) => setRepositoryEndpoint(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="repositoryClientSecret">
                {t('REPOSITORY_CLIENT_SECRET')}
              </label>
              <InputText
                id="repositoryClientSecret"
                type="text"
                value={repositoryClientSecret}
                onChange={(e) => setRepositoryClientSecret(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="p-formgrid p-grid p-justify-start">
            <div className="p-field p-col-12 p-md-6">
              <Button
                label={t('ADD_REPOSITORY')}
                icon="pi pi-plus-circle"
                className="p-button-primary p-mr-2 p-mb-2"
                disabled={
                  repositoryName.length === 0 ||
                  repositoryType.length === 0 ||
                  repositoryEndpoint.length === 0
                }
                onClick={() => {
                  addRepository(
                    repositoryName,
                    repositoryType,
                    repositoryEndpoint,
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTargetedRepositories;
