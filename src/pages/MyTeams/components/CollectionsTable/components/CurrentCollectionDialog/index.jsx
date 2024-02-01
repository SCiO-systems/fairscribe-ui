import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollectionService from '../../../../../../services/collectionsService';
import { ToastContext } from '../../../../../../store';
import { handleError } from '../../../../../../utilities/errors';

const CurrentCollectionDialog = ({
	dialogOpen,
	setDialogOpen,
	collection,
	team,
	updateCollections,
}) => {
	const { t } = useTranslation();
	const { setError, setSuccess } = useContext(ToastContext);
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState((collection && collection.title) || '');
	const [description, setDescription] = useState(
		(collection && collection.description) || ''
	);

	useEffect(() => {
		if (collection && collection.title && collection.description) {
			setTitle(collection.title);
			setDescription(collection.description);
		} else {
			setTitle('');
			setDescription('');
		}
	}, [collection]);

	const createCollection = () => {
		CollectionService.createTeamCollection(team.id, {
			title,
			description,
		})
			.then(() => {
				updateCollections();
			});
	};

	const updateCollection = () => {
		CollectionService.updateTeamCollection(team.id, collection.id, {
			title,
			description,
		})
			.then(() => {
				updateCollections();
			});
	};

	const handleSubmit = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		try {
			if (collection && collection.title) {
				await updateCollection();
				setSuccess('Collection', 'The collection has been updated!');
			} else {
				await createCollection();
				setSuccess('Collection', 'The collection has been created!');
			}
			setTitle('');
			setDescription('');
			setDialogOpen(false);
		} catch (error) {
			setError(handleError(error));
		}
		setIsLoading(false);
	};

	return (
		<Dialog
			header={collection ? t('EDIT_COLLECTION') : t('CREATE_A_NEW_COLLECTION')}
			visible={dialogOpen}
			style={{ width: '400px' }}
			draggable={false}
			modal
			onHide={() => setDialogOpen(false)}
		>
			<div className="p-fluid">
				<div>
					<div className="p-formgrid p-grid">
						<div className="p-col-12 p-field">
							<label htmlFor="title">{t('COLLECTION_TITLE')}</label>
							<InputText
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
					</div>
					<div className="p-formgrid p-grid">
						<div className="p-col-12 p-field">
							<label htmlFor="title">{t('COLLECTION_DESCRIPTION')}</label>
							<InputText
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
					</div>
					<div className="p-formgrid p-grid">
						<div className="p-col-12 p-text-center p-mt-2">
							<div className="p-d-inline-flex p-ai-center p-jc-center">
								<Button
									icon={collection ? 'pi pi-save' : 'pi pi-plus'}
									label={
										collection
											? t('SAVE_COLLECTION_BUTTON')
											: t('CREATE_COLLECTION_BUTTON')
									}
									className="p-mr-2 p-mb-2"
									loading={isLoading}
									onClick={handleSubmit}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default CurrentCollectionDialog;
