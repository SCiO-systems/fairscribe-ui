import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TeamsService from '../../../../../../services/teamsService';
import RepositoriesService from '../../../../../../services/repositoriesService';
import { ToastContext } from '../../../../../../store';
import { handleError } from '../../../../../../utilities/errors';

const UploadToRepoDialog = ({ dialogOpen, setDialogOpen, teamId, resource, onFilter }) => {
	const { t } = useTranslation();
	const [selectedRepo, setSelectedRepo] = useState(null);
	const [selectedCollection, setSelectedCollection] = useState(null);
	const { setError, setSuccess } = useContext(ToastContext);
	const [isLoading, setIsLoading] = useState(false);
	const [userRepos, setUserRepos] = useState([]);
	const [repoCollections, setRepoCollections] = useState([]);
	const [reposLoading, setReposLoading] = useState(true);
	const [collectionPickerDisabled, setCollectionPickerDisabled] = useState(false);

	const loadRepositories = () => {
		setReposLoading(true);
		RepositoriesService.getRepositories()
			.then((res) => {
				setUserRepos(res.data);
				setCollectionPickerDisabled(false);
				setSelectedCollection(null);
				setReposLoading(false);
			});
	};

	const publish = () => {
		setIsLoading(true);
		const metatata = {};
		TeamsService.publishResource(teamId, resource.id, selectedRepo.id, metatata)
			.then((res) => {
				setSuccess('Resource', 'Resource has been published!');
				setDialogOpen(false);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(handleError(error));
				setIsLoading(false);
			});
		if (onFilter) onFilter();
	};

	useEffect(() => {
		if (dialogOpen) {
			loadRepositories();
		}
	}, [dialogOpen]);

	useEffect(() => {
		if (selectedRepo === null || (selectedRepo !== null && selectedRepo.type !== 'dataverse')) return;
		try {
			const { collections } = JSON.parse(selectedRepo.metadata);
			setRepoCollections(collections);
			if (resource.repositories && resource.repositories.length > 0) {
				// Search if the selected repo is included in the attached repos
				resource.repositories.forEach((r) => {
					if (r.repository_id === selectedRepo.id) {
						// if so, disable the collection picker and pre-select the value
						setCollectionPickerDisabled(true);
						setSelectedCollection(r.collection);
					}
				});
			}
		} catch (e) {
			// eslint-disable-next-line
      console.error(e);
		}
	}, [selectedRepo, resource]);

	return (
		<Dialog
			header={t('PUBLISH_RESOURCE')}
			visible={dialogOpen}
			style={{ width: '500px' }}
			draggable={false}
			modal
			onHide={() => {
				setUserRepos([]);
				setSelectedRepo(null);
				setDialogOpen(false);
			}}
		>
			<div className="p-fluid">
				<div className="p-formgrid p-grid">
					{!reposLoading && (
						<>
							<div className="p-col-12">
								<div className="p-field">
									{userRepos.length > 0 ? (
										<Dropdown
											options={userRepos}
											optionLabel={(option) => `${option.name} (${option.type.toUpperCase()})`}
											id="repo"
											placeholder={t('SELECT_TARGET_REPOSITORY')}
											value={selectedRepo}
											onChange={(e) => setSelectedRepo(e.value)}
										/>
									) : (
										<p>{t('NO_REPOSITORIES_GENERIC')}</p>
									)}
								</div>
							</div>
							{(selectedRepo && selectedRepo.type === 'dataverse' && repoCollections.length > 0) && (
								<div className="p-col-12">
									<div className="p-field">
										<Dropdown
											disabled={collectionPickerDisabled}
											options={repoCollections}
											optionLabel="value"
											optionValue="value"
											id="repo"
											placeholder={t('SELECT_DATAVERSE_COLLECTION')}
											value={selectedCollection}
											onChange={(e) => setSelectedCollection(e.value)}
										/>
									</div>
									{collectionPickerDisabled && (
										<p className="p-text-small p-mb-2">{t('DATAVERSE_COLLECTIONS_ALREADY_PUBLISHED')}</p>
									)}
								</div>
							)}
							<div className="p-col-12 p-text-center p-mt-3">
								<div className="p-d-inline-flex p-col-6 p-ai-center p-jc-center">
									<Button
										label={t('PUBLISH_RESOURCE')}
										icon="pi pi-upload"
										className="p-mr-2 p-mb-2"
										loading={isLoading}
										disabled={
											(selectedRepo === null) ||
                    (selectedRepo !== null && selectedRepo.type === 'dataverse' && !selectedCollection)
										}
										onClick={() => publish()}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export default UploadToRepoDialog;
