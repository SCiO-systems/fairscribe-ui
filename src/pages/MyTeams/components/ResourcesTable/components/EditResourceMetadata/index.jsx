import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ResourcesService from '../../../../../../services/resourcesService';
import { handleError } from '../../../../../../utilities/errors';

const EditResourceMetadata = (props) => {
	const { editResourceMetadataDialog, setEditResourceMetadataDialog, selectedResource, teamId } = props;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const { t } = useTranslation();

	const handleSave = () => {
		const metadataRecord = selectedResource.metadata_record || {};
		const { type, subtype } = selectedResource;
		const record = {
			title: [{
				language: {
					label: 'English',
					value: 'English',
					name: 'English',
					iso_code_639_1: 'en',
					iso_code_639_2: 'eng',
				},
				value: title,
			}],
			description: [{
				language: {
					label: 'English',
					value: 'English',
					name: 'English',
					iso_code_639_1: 'en',
					iso_code_639_2: 'eng',
				},
				value: description,
			}],
			...metadataRecord,
			dataCORE_version: '1.0',
			dataNODE_id: '',
			providers: [],
			sources: [],
			resource_type: { type, subtype },
		};
		ResourcesService.updateResource(teamId, selectedResource.id, {
			collections: selectedResource.collections,
			status: selectedResource.status,
			metadata_record: record,
		});
		// .then((res) => {
		// 	if (showMessage) {
		// 		setSuccess('Resource', 'Resource changes have been saved!');
		// 	}
		// 	if (sendForReview) {
		// 		navigate(`/teams/${teamId}`);
		// 	}
		// })
		// .catch((error) => {
		// 	setError(handleError(error));
		// });

		setTitle('');
		setDescription('');
		setEditResourceMetadataDialog(false);
	};

	const footerTemplate = () => {
		return (
			<div>
				<Button
					label="Cancel"
					onClick={() => {
						setTitle('');
						setDescription('');
						setEditResourceMetadataDialog(false);
					}}
				/>
				<Button label="Save Changes" onClick={() => handleSave()} />
			</div>
		);
	};

	return (
		<Dialog header="Update Resource Metadata" visible={editResourceMetadataDialog} footer={footerTemplate} style={{ width: '90vw' }} onHide={() => setEditResourceMetadataDialog(false)}>
			<div className="p-fluid p-grid p-justify-start">
				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="p-field">
						<label htmlFor="resource-title" style={{ color: 'red', margin: '0' }}>{t('RESOURCE_TITLE')} (in English) *</label>
						<InputText
							id="resource-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className="p-fluid p-grid p-justify-start">
				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="p-field">
						<label htmlFor="resource-description" style={{ color: 'red', margin: '0' }}>{t('RESOURCE_DESCRIPTION')} (in English) *</label>
						<InputTextarea
							id="resource-description"
							rows={5}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default EditResourceMetadata;
