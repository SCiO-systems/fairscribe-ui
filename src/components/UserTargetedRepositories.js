import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getRepositoryTypes from '../services/repositories';
import {
  createUserRepository,
  deleteUserRepository,
  getUserRepositories,
} from '../services/users';
import { ToastContext } from '../store';
import { handleError } from '../utilities/errors';

const UserTargetedRepositories = ({ userId }) => {
  const { t } = useTranslation();
  const { setError, setSuccess } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [repositoryTypes, setRepositoryTypes] = useState([]);
  const [repositoryType, setRepositoryType] = useState([]);
  const [repositoryName, setRepositoryName] = useState('');
  const [repositoryEndpoint, setRepositoryEndpoint] = useState('');
  const [repositoryClientSecret, setRepositoryClientSecret] = useState('');

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

  const actionsTemplate = (rowData) => (
    <div className="p-text-center">
      <Button
        icon="pi pi-trash"
        className="p-button p-component p-button-rounded p-button-danger p-button-text p-mr-2 p-mb-2 p-button-icon-only"
        onClick={() => {
          deleteRepository(rowData.id);
        }}
      />
    </div>
  );

  const deleteRepository = async (id) => {
    try {
      await deleteUserRepository(id, userId);
      await fetchUserRepositories();
      setSuccess('Repository', `The repository has been deleted.`);
    } catch (e) {
      setError(handleError(e));
    }
  };

  const createRepository = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserRepository(userId, {
        name: repositoryName,
        type: repositoryType,
        api_endpoint: repositoryEndpoint,
        client_secret: repositoryClientSecret,
      });
      setSuccess('Repository', `The new repository has beed added.`);
      setRepositoryEndpoint('');
      setRepositoryName('');
      setRepositoryClientSecret('');
      await fetchUserRepositories();
    } catch (error) {
      setError(handleError(error));
    }
    setIsLoading(false);
  };

  const fetchRepositoryTypes = async () => {
    try {
      const { data: types } = await getRepositoryTypes();
      setRepositoryTypes(
        types.map((type) => ({ label: type.name, value: type.value }))
      );
    } catch (e) {
      setError(handleError(e));
    }
  };

  const fetchUserRepositories = async () => {
    try {
      const { data } = await getUserRepositories(userId);
      setRepositories(data);
    } catch (e) {
      setError(handleError(e));
    }
  };

  useEffect(() => {
    Promise.all([fetchUserRepositories(), fetchRepositoryTypes()]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    className="p-text-center"
                  />
                  <Column
                    header={t('REPOSITORY_ACTIONS')}
                    body={actionsTemplate}
                    className="p-text-center"
                  />
                </DataTable>
              ) : (
                <p>{t('NO_REPOSITORIES_FOUND')}</p>
              )}
            </div>
          </div>
          <form onSubmit={createRepository}>
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
                  loading={isLoading}
                  type="submit"
                  disabled={
                    repositoryName.length === 0 ||
                    repositoryType.length === 0 ||
                    repositoryEndpoint.length === 0
                  }
                  onClick={createRepository}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserTargetedRepositories;
