import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const EditResourceDialog = ({ dialogOpen, setDialogOpen, teamId, resource }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Dialog
			header={t('UPDATE_RESOURCE')}
			visible={dialogOpen}
			style={{ width: '400px' }}
			draggable={false}
			modal
			onHide={() => setDialogOpen(false)}
		>
			<div className="p-grid p-formgrid">
				<div className="p-col-12">
					<p>
						Are you sure you want to update the metadata of the resource entitled{' '}
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
							label={t('EDIT_RESOURCE')}
							icon="pi pi-pencil"
							className="p-button p-mr-2 p-mb-2"
							onClick={() => navigate(`/teams/${teamId}/resources/${resource?.id}/mode/edit`)}
						/>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default EditResourceDialog;
