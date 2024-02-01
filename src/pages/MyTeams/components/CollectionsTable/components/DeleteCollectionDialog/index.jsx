import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollectionService from '../../../../../../services/collectionsService';
import { ToastContext } from '../../../../../../store';

const DeleteCollectionDialog = ({
	dialogOpen,
	setDialogOpen,
	team,
	collection,
	updateCollections,
}) => {
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(false);
	const { setError, setSuccess } = useContext(ToastContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		CollectionService.deleteTeamCollection(team?.id, collection?.id)
			.then((res) => {
				setSuccess('The collection has been deleted successfully!');
				setDialogOpen(false);
				setIsLoading(false);
				updateCollections();
			})
			.catch((error) => {
				if (error?.response) {
					setError(
						'Oops!',
						error?.response?.data?.errors[
							Object.keys(error?.response?.data?.errors)[0]
						][0]
					);
				} else {
					setError('Oops!', 'Something went wrong');
				}
				setIsLoading(false);
				setDialogOpen(false);
			});
	};

	return (
		<Dialog
			header={t('DELETE_COLLECTION')}
			visible={dialogOpen}
			style={{ width: '400px' }}
			draggable={false}
			modal
			onHide={() => setDialogOpen(false)}
		>
			<div className="p-fluid">
				<div className="p-formgrid p-grid">
					<div>
						<div className="p-col-12">
							<p>
								Are you sure you want to delete collection{' '}
								<strong>{collection?.title}</strong>?
							</p>
						</div>
						<div className="p-col-12 p-text-center p-mt-4">
							<div className="p-d-flex p-fluid p-ai-center p-jc-center">
								<Button
									type="button"
									label={t('CANCEL')}
									icon="pi pi-times"
									className="p-button-secondary p-mr-2 p-mb-2"
									onClick={() => setDialogOpen(false)}
								/>
								<Button
									label={t('DELETE_COLLECTION')}
									icon="pi pi-trash"
									className="p-button-danger p-mr-2 p-mb-2"
									onClick={handleSubmit}
									loading={isLoading}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default DeleteCollectionDialog;
