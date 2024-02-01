import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import DoiService from '../../../../../../../../../../../../services/doiService';
import { ToastContext } from '../../../../../../../../../../../../store';
import { handleError } from '../../../../../../../../../../../../utilities/errors';

const DOIs = ({ header, mandatory, mode, title, dois, setDois }) => {
	const { t } = useTranslation();
	const { setError } = useContext(ToastContext);
	const [isLoading, setIsLoading] = useState(false);
	const [doi, setDoi] = useState('');
	const [newValueDialog, setNewValueDialog] = useState(false);

	const verifyAndAddDoi = () => {
		setIsLoading(true);
		DoiService.validateDoi(doi, title.trim())
			.then((res) => {
				setDois([{ ...res }]);
				setDoi('');

				setIsLoading(false);
			})
			.catch((e) => {
				setError(handleError(e));

				setIsLoading(false);
			});
	};

	const verifiedTemplate = (rowData) => (
		<div className="p-text-left">
			{rowData.matchesTitle ? (
				<i
					className="pi pi-check text-green bg-green rounded-full p-p-1"
					style={{ fontSize: '1rem' }}
				/>
			) : (
				<div className="p-d-flex p-ai-center">
					<i
						className="pi pi-times text-red bg-red rounded-full p-p-1"
						style={{ fontSize: '1rem' }}
					/>
					<span className="text-red p-ml-2 text-xs">Does not match resource title.</span>
				</div>
			)}
		</div>
	);

	const providerTemplate = (rowData) => {
		if (rowData.provider === 'datacite') {
			return <span>DataCite</span>;
		}
		if (rowData.provider === 'crossref') {
			return <span>Crossref</span>;
		}
		return <span>N/A</span>;
	};

	const editTemplate = ({ value }) => (
		<div className="p-text-right">
			<Button
				className="p-button-danger"
				icon="pi pi-trash"
				onClick={() => setDois(dois.filter((d) => d.value !== value))}
			/>
		</div>
	);

	const headerTemplate = () => {
		return (
			<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				{mandatory ? <p style={{ color: 'red', margin: '0' }}>{header} *</p> : <p style={{ margin: '0' }}>{header}</p>}
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

	return (
		<>
			<DataTable header={headerTemplate} emptyMessage="" value={dois} className="p-mb-4">
				<Column field="value" header={t('DOI_TITLE')} />
				<Column field="verified" header={t('VERIFIED')} body={verifiedTemplate} />
				<Column
					field="provider"
					header={t('DOI_SERVICE_PROVIDER')}
					body={providerTemplate}
				/>
				{mode === 'edit' && (
					<Column
						body={editTemplate}
					/>
				)}
			</DataTable>
			<Dialog header={header} visible={newValueDialog} style={{ width: '90vw' }} footer={dialogFooter} onHide={() => setNewValueDialog(false)}>
				<div className="p-formgrid p-grid p-fluid">
					<div className="p-col-12">
						<div className="p-field">
							<InputText
								name="doi"
								disabled={isLoading}
								placeholder="Enter digital object identifier (DOI)"
								value={doi}
								onChange={(e) => setDoi(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default DOIs;
