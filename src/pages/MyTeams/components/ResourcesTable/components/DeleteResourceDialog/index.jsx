import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResourcesService from '../../../../../../services/resourcesService';
import { ToastContext } from '../../../../../../store';

const DeleteResourceDialog = ({
	dialogOpen,
	setDialogOpen,
	teamId,
	resource,
	onSuccess,
}) => {
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(false);
	const { setError, setSuccess } = useContext(ToastContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		ResourcesService.deleteTeamResource(teamId, resource?.id)
			.then((res) => {
				setSuccess('The resource has been deleted successfully!');
				setDialogOpen(false);
				onSuccess();

				setIsLoading(false);
				setDialogOpen(false);
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
			header={t('DELETE_RESOURCE')}
			visible={dialogOpen}
			style={{ width: '400px' }}
			draggable={false}
			modal
			onHide={() => setDialogOpen(false)}
		>
			<form className="p-grid p-formgrid" onSubmit={handleSubmit}>
				<div className="p-col-12">
					<p>
						Are you sure you want to delete resource{' '}
						<strong>{resource?.title}</strong>?
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
							label={t('DELETE_RESOURCE')}
							icon="pi pi-trash"
							className="p-button-danger p-mr-2 p-mb-2"
							onClick={handleSubmit}
							loading={isLoading}
						/>
					</div>
				</div>
			</form>
		</Dialog>
	);
};

export default DeleteResourceDialog;
