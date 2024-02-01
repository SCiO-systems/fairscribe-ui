import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';

const MultipleTextEntriesTable = ({
	mode,
	data,
	header,
	onDeleteItem,
	onAddItem,
	helpText,
	className,
	mandatory,
}) => {
	const { t } = useTranslation();
	const [entry, setEntry] = useState('');
	const [helpDialogOpen, setHelpDialogOpen] = useState(false);
	const [newValueDialog, setNewValueDialog] = useState(false);

	const onSubmit = (e) => {
		onAddItem(entry);
		setEntry('');
	};

	const onDelete = (e) => {
		onDeleteItem(e);
	};

	const headerTemplate = (body) => (
		<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				{mandatory ? <p style={{ color: 'red', margin: '0' }}>{header} *</p> : <p style={{ margin: '0' }}>{header}</p>}
				{helpText && helpText.length > 0 && (
					<Button
						onClick={() => setHelpDialogOpen(!helpDialogOpen)}
						icon="pi pi-question-circle"
						style={{ padding: '0 1.125rem' }}
						className="p-ml-2 p-button-rounded p-button-lg p-button-text p-button-secondary"
					/>
				)}
			</div>
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

	const deleteTemplate = (e) => (
		<div className="p-text-right">
			<Button
				className="p-button-danger"
				icon="pi pi-trash"
				onClick={() => onDelete(e)}
			/>
		</div>
	);

	const dialogFooter = () => {
		return (
			<div>
				<Button label="Cancel" onClick={() => setNewValueDialog(false)} />
				<Button
					label="Add"
					onClick={() => {
						onSubmit();
						setNewValueDialog(false);
					}}
					disabled={!entry}
				/>

			</div>
		);
	};

	return (
		<>
			<DataTable
				emptyMessage=""
				value={data}
				// footer={footerTemplate}
				className={classNames([className])}
				// header={tableHeaderTemplate}
				header={headerTemplate(header)}
				dataKey="value"
				id="multiple-text-entries"
			>
				<Column field="value" />
				{mode === 'edit' && (
					<Column
						body={deleteTemplate}
					/>
				)}
			</DataTable>
			{helpText && helpText.length > 0 && (
				<Dialog
					header={header}
					onHide={() => setHelpDialogOpen(false)}
					visible={helpDialogOpen}
					style={{ width: '500px', maxWidth: '90%' }}
				>
					<p style={{ lineHeight: '1.75' }}>{helpText}</p>
				</Dialog>
			)}
			<Dialog header={header} visible={newValueDialog} style={{ width: '90vw' }} footer={dialogFooter} onHide={() => setNewValueDialog(false)}>
				<div className="p-formgrid p-grid p-fluid">
					<div className="p-col-10">
						<div className="p-field">
							<InputTextarea
								value={entry}
								onChange={(e) => setEntry(e.target.value)}
								rows={2}
								autoResize
								cols={50}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default MultipleTextEntriesTable;
