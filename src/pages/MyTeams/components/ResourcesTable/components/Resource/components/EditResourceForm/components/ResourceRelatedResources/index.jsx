import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import DoiService from '../../../../../../../../../../services/doiService';
import { ToastContext } from '../../../../../../../../../../store';
import { handleError } from '../../../../../../../../../../utilities/errors';

const ResourceRelatedResources = ({ mandatory, initialData, setter, mode }) => {
	const { t } = useTranslation();
	const { setError } = useContext(ToastContext);
	const [dois, setDois] = useState(initialData.related_resources || []);
	const [isLoading, setIsLoading] = useState(false);
	const [doi, setDoi] = useState('');
	const [newValueDialog, setNewValueDialog] = useState(false);

	const removeDoi = (id) => {
		setDois(dois.filter(({ DOI }) => DOI !== id));
	};

	const verifyAndAddDoi = async () => {
		setIsLoading(true);
		const title = initialData.title.find((item) => item.language.value === 'English');
		DoiService.validateDoi(doi, title?.value?.trim())
			.then((res) => {
				setDois(dois.filter(({ DOI }) => DOI !== res.value).concat({ DOI: res.value }));
				setDoi('');

				setIsLoading(false);
			})
			.catch((error) => {
				setError(handleError(error));

				setIsLoading(false);
			});
	};

	useEffect(() => {
		setter(dois);
	}, [dois]); // eslint-disable-line react-hooks/exhaustive-deps

	const verifiedTemplate = (rowData) => (
		<div className="p-d-flex p-jc-start p-ai-center">
			<i
				className="pi pi-check text-green bg-green rounded-full p-p-1"
				style={{ fontSize: '1rem' }}
			/>
		</div>
	);

	const bodyTemplate = ({ DOI }) => (
		<div className="p-text-right">
			<Button
				onClick={() => removeDoi(DOI)}
				className="p-button-danger"
				icon="pi pi-trash"
			/>
		</div>
	);

	const headerTemplate = () => {
		return (
			<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
				{mode === 'edit' && 		(
					<Button
						label={t('ADD')}
						className="p-mr-2 p-mb-2"
						onClick={() => setNewValueDialog(true)}
						icon="pi pi-plus"
					/>
				)
				}
			</div>
		);
	};

	const dialogFooter = () => {
		return (
			<div>
				<Button label="Cancel" onClick={() => setNewValueDialog(false)} />
				<Button
					label="Add"
					onClick={() => {
						verifyAndAddDoi();
						setNewValueDialog(false);
					}}
					disabled={!doi}
				/>

			</div>
		);
	};

	const legendTemplate = () => {
		return mandatory.related_resources ? <p style={{ color: 'red', margin: '0' }}>{t('RELATED_RESOURCES')} *</p> : <p style={{ margin: '0' }}>{t('RELATED_RESOURCES')}</p>;
	};

	return (
		<Fieldset id="resource-related-resources" legend={legendTemplate()} className="p-mb-4">
			<DataTable header={headerTemplate} emptyMessage="" value={dois}>
				<Column header="DOI" body={({ DOI }) => DOI} />
				<Column field="verified" header={t('VERIFIED')} body={verifiedTemplate} />
				<Column
					body={bodyTemplate}
				/>
			</DataTable>
			<Dialog header="Related Resources" visible={newValueDialog} style={{ width: '90vw' }} footer={dialogFooter} onHide={() => setNewValueDialog(false)}>
				<div className="p-formgrid p-grid p-fluid">
					<div className="p-col-10">
						<div className="p-field">
							<InputText
								name="doi"
								disabled={isLoading}
								value={doi}
								type="text"
								onChange={(e) => setDoi(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</Fieldset>
	);
};

export default ResourceRelatedResources;
