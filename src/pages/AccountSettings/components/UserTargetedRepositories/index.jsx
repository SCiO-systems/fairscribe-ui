import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataverseFields, IITACKANFields } from './components';
import RepositoriesService from '../../../../services/repositoriesService';
import { ToastContext } from '../../../../store';
import { handleError } from '../../../../utilities/errors';
import './styles.css';
import { ApiDataContext } from '../../../../components/Menu';

const UserTargetedRepositories = () => {
	const {
		repositoryTypes,
	} = useContext(ApiDataContext);

	const { t } = useTranslation();
	const { setError, setSuccess } = useContext(ToastContext);
	const [isLoading, setIsLoading] = useState(false);
	const [editingRepoId, setEditingRepoId] = useState(null);
	const [repositories, setRepositories] = useState([]);
	// const [repositoryTypes, setRepositoryTypes] = useState([]);
	const [repositoryType, setRepositoryType] = useState('');
	const [displayDialog, setDisplayDialog] = useState(false);
	const [body, setBody] = useState({});
	const typeTemplate = (rowData) => <div>{rowData.type}</div>;
	const nameTemplate = (rowData) => <div>{rowData.name}</div>;
	const endpointTemplate = (rowData) => <div>{rowData.api_endpoint}</div>;
	const connectionTemplate = (rowData) => (
		<div className="p-text-center">
			{rowData.connection_verified_at ? (
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
				icon="pi pi-pencil"
				className="p-button p-component p-button-rounded p-button-primary p-button-text p-mr-2 p-mb-2 p-button-icon-only"
				onClick={() => loadRepoForEdit(rowData.id)}
			/>
			{rowData.connection_verified_at === null && (
				<Button
					icon="pi pi-refresh"
					className="p-button p-component p-button-rounded p-button-secondary p-button-text p-mr-2 p-mb-2 p-button-icon-only"
					onClick={() => retryVerifyConnection(rowData.id)}
				/>
			)}
			<Button
				icon="pi pi-trash"
				className="p-button p-component p-button-rounded p-button-danger p-button-text p-mr-2 p-mb-2 p-button-icon-only"
				onClick={() => remove(rowData.id)}
			/>
		</div>
	);

	const remove = (id) => {
		RepositoriesService.deleteRepository(id)
			.then((res) => {
				fetchUserRepositories();
				setSuccess('Repository', `The repository has been deleted.`);
			})
			.catch((e) => {
				setError(handleError(e));
			});
	};

	const loadRepoForEdit = (repositoryId) => {
		// setIsLoading(true);
		RepositoriesService.getRepository(repositoryId)
			.then((res) => {
				// setRepositoryType(res.data?.type);
				// setRepositoryEndpoint(res.data?.api_endpoint);
				// setRepositoryName(res.data?.name);
				// setRepositoryClientSecret('');
				const { collections } = JSON.parse(res.data?.metadata);
				// setDataverseCollections(collections);
				setEditingRepoId(res.data?.id);
				setDisplayDialog(true);
				setBody({
					name: res.data?.name,
					type: 'dataverse',
					api_endpoint: res.data?.api_endpoint,
					client_secret: '',
					metadata: collections,
				});
				// setIsLoading(false);
			})
			.catch((error) => {
				setError(handleError(error));
				// resetFormAndReloadRepos();

				// setIsLoading(false);
			});
	};

	const fetchUserRepositories = () => {
		RepositoriesService.getRepositories()
			.then((res) => {
				setRepositories(res.data);
			})
			.catch((e) => {
				setError(handleError(e));
			});
	};

	const retryVerifyConnection = (repositoryId) => {
		RepositoriesService.verifyConnection(repositoryId)
			.then((res) => {
				if (res.data?.connection_verified_at !== null) {
					fetchUserRepositories();
				}
			})
			.catch((e) => {
				setError(handleError(e));
			});
	};

	useEffect(() => {
		// Promise.all([fetchUserRepositories(), fetchRepositoryTypes()]);
		fetchUserRepositories();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const headerTemplate = () => {
		return (
			<div className="p-field p-col-6">
				<Button
					label={t('ADD_REPOSITORY')}
					icon="pi-plus-circle"
					className="p-button-primary p-mr-2 p-mb-2"
					loading={isLoading}
					onClick={() => setDisplayDialog(true)}
				/>
			</div>
		);
	};

	const renderFields = () => {
		if (repositoryType['repository-code'] === 'dataverse') {
			return <DataverseFields setBody={setBody} body={body} />;
		}
		if (repositoryType['repository-code'] === 'iita-ckan') {
			return <IITACKANFields setBody={setBody} body={body} />;
		}
		return null;
	};

	const editRepository = () => {
		RepositoriesService.updateRepository(editingRepoId, body)
			.then((res) => {
				setSuccess('Repository', `Changes have been saved.`);
				setBody({});
				setEditingRepoId(null);
				fetchUserRepositories();
			})
			.catch((error) => {
				setBody({});
				setError(handleError(error));
			});
	};

	const createRepository = () => {
		RepositoriesService.createRepository(body)
			.then((res) => {
				setSuccess('Repository', `The new repository has beed added.`);
				setBody({});
				fetchUserRepositories();
			})
			.catch((error) => {
				setBody({});
				setError(handleError(error));
			});
	};

	const footerTemplate = () => {
		return (
			<>
				<Button
					label="Save"
					onClick={() => {
						setDisplayDialog(false);
						if (editingRepoId !== null) {
							return editRepository();
						}
						return createRepository();
					}
					}
				/>
				<Button
					label="Cancel"
					onClick={() => {
						setBody({});
						setDisplayDialog(false);
					}}
				/>
			</>
		);
	};

	return (
		<div className="p-grid p-mt-1 p-mb-3">
			<div className="p-col-12">
				<div className="card p-fluid p-shadow-4 rounded">
					<h5>{t('USER_TARGETED_REPOSITORIES_TITLE')}</h5>
					<div className="p-formgrid p-grid p-justify-start">
						<div className="p-field p-col-12 p-md-12">
							<DataTable value={repositories} className="p-mt-2" header={headerTemplate}>
								<Column field="name" header={t('REPOSITORY_NAME')} body={nameTemplate} />
								<Column field="type" header={t('REPOSITORY_TYPE')} body={typeTemplate} />
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
						</div>
					</div>
					<Dialog
						header={editingRepoId ? 'Edit repository' : 'Add new repository'}
						footer={footerTemplate}
						visible={displayDialog}
						style={{ width: '80vw' }}
						onHide={() => {
							setBody({});
							setDisplayDialog(false);
						}}
					>
						<div className="repository-fields">
							<div className="field">
								<label htmlFor="ui-language">{t('REPOSITORY_TYPE')}</label>
								<Dropdown
									id="ui-language"
									value={repositoryType}
									options={repositoryTypes}
									optionLabel="repository"
									onChange={(e) => setRepositoryType(e.value)}
									placeholder={t('SELECT_REPOSITORY_TYPE')}
									className="p-d-flex"
								/>
							</div>
							{renderFields()}
						</div>
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default UserTargetedRepositories;
