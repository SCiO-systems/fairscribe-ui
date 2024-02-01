import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';

const schemes = [
	{ label: 'ArXiv', value: 'ArXiv' },
	{ label: 'ISBN', value: 'ISBN' },
	{ label: 'eISBN', value: 'eISBN' },
	{ label: 'ISSN', value: 'ISSN' },
	{ label: 'eISSN', value: 'eISSN' },
];

const PIDs = ({ header, mandatory, mode, pids, setPids }) => {
	const { t } = useTranslation();
	const [pid, setPid] = useState('');
	const [scheme, setScheme] = useState('');
	const [newValueDialog, setNewValueDialog] = useState(false);

	const getAvailableSchemes = () => {
		const existingSchemes = pids.map((p) => p.scheme);
		return schemes.filter(({ value }) => !existingSchemes.includes(value));
	};

	const addIdentifier = () => {
		setPids(pids.filter((p) => p.scheme !== scheme).concat({ value: pid, scheme }));
		setPid('');
		setScheme('');
	};

	const pidFooterTemplate = mode === 'edit' && (
		<form
			className="p-formgrid p-grid p-fluid"
			onSubmit={(e) => {
				e.preventDefault();
				addIdentifier();
			}}
		>
			<div className="p-col-2">
				<div className="p-field">
					<Dropdown
						value={scheme}
						options={getAvailableSchemes()}
						onChange={(e) => setScheme(e.value)}
						placeholder={t('PID_SCHEME')}
					/>
				</div>
			</div>
			<div className="p-col-8">
				<div className="p-field">
					<InputText
						name="pid"
						placeholder="Enter alternative identifier"
						value={pid}
						onChange={(e) => setPid(e.target.value)}
					/>
				</div>
			</div>
			<div className="p-col-2">
				<div className="p-field">
					<Button disabled={pid === ''} label={t('ADD')} type="submit" />
				</div>
			</div>
		</form>
	);

	const bodyTemplate = (rowData) => (
		<div className="p-text-right">
			<Button
				className="p-button-danger"
				icon="pi pi-trash"
				onClick={() => setPids(pids.filter((p) => p.scheme !== rowData.scheme))}
			/>
		</div>
	);

	const headerTemplate = () => {
		return (
			<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				{mandatory ? <p style={{ color: 'red', margin: '0' }}>{header} *</p> : <p style={{ margin: '0' }}>{header}</p>}
				{mode === 'edit' && 		(
					<Button label={t('ADD')} onClick={() => setNewValueDialog(true)} icon="pi pi-plus" />
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
						addIdentifier();
						setNewValueDialog(false);
					}}
					disabled={!pid}
				/>

			</div>
		);
	};

	return (
		<>
			<DataTable header={headerTemplate} emptyMessage="" value={pids}>
				<Column field="value" header={t('PID_VALUE')} />
				<Column field="scheme" header={t('PID_SCHEME')} />
				{mode === 'edit' && (
					<Column
						body={bodyTemplate}
					/>
				)}
			</DataTable>
			<Dialog header={header} visible={newValueDialog} style={{ width: '90vw' }} footer={dialogFooter} onHide={() => setNewValueDialog(false)}>
				<div className="p-formgrid p-grid p-fluid">
					<div className="p-col-2">
						<div className="p-field">
							<Dropdown
								value={scheme}
								options={getAvailableSchemes()}
								onChange={(e) => setScheme(e.value)}
								placeholder={t('PID_SCHEME')}
							/>
						</div>
					</div>
					<div className="p-col-8">
						<div className="p-field">
							<InputText
								name="pid"
								placeholder="Enter alternative identifier"
								value={pid}
								onChange={(e) => setPid(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default PIDs;
