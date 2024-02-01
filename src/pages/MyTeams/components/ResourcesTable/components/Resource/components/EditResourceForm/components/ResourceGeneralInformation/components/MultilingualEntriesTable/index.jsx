import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MultilingualEntriesTable = ({
	mode,
	data,
	header,
	multipleLines,
	className,
	onDeleteItem,
	onAddItem,
	availableLanguages,
	mandatory,
}) => {
	const { t } = useTranslation();
	const [languageValue, setLanguageValue] = useState('');
	const [textValue, setTextValue] = useState('');
	const [selectedLanguages, setSelectedLanguages] = useState(data.map((s) => s.language) || []);
	const [newValueDialog, setNewValueDialog] = useState(false);

	const getAvailableLanguages = () =>
		availableLanguages
			.map((al) => ({ label: al.name, value: al.name, ...al }))
			.filter((l) => !selectedLanguages.map((s) => s.name).includes(l.name));

	const getLanguageByValue = (v) =>
		availableLanguages
			.map((al) => ({ label: al.name, value: al.name, ...al }))
			.filter((l) => l.name === v)
			?.pop();

	const onSubmit = () => {
		const selectedLang = getLanguageByValue(languageValue);
		onAddItem({ language: selectedLang, value: textValue });
		setSelectedLanguages([...selectedLanguages, selectedLang]);
		setLanguageValue('');
		setTextValue('');
	};

	const onDelete = (langValue) => {
		onDeleteItem(langValue);
		setSelectedLanguages(selectedLanguages.filter((s) => s?.value !== langValue));
	};

	const dangerTemplate = ({ language }) => (
		<div className="p-text-right">
			<Button
				className="p-button-danger"
				icon="pi pi-trash"
				onClick={() => onDelete(language?.value)}
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
						onSubmit();
						setNewValueDialog(false);
					}}
					disabled={!languageValue || !textValue}
				/>

			</div>
		);
	};

	return (
		<>
			<DataTable
				header={headerTemplate}
				emptyMessage=""
				value={data}
				dataKey="language"
				className={classNames([className])}
			>
				<Column header={t('LANGUAGE')} field="name" body={({ language: { name } }) => name || ''} />
				<Column header={t('TEXT')} field="value" />
				{mode === 'edit' && (
					<Column
						body={dangerTemplate}
					/>
				)}
			</DataTable>
			<Dialog header={header} visible={newValueDialog} style={{ width: '90vw' }} footer={dialogFooter} onHide={() => setNewValueDialog(false)}>
				<div className="p-formgrid p-grid p-fluid">
					<div className="p-col-2">
						<div className="p-field">
							<Dropdown
								filter
								filterBy="label"
								value={languageValue}
								options={getAvailableLanguages()}
								onChange={(e) => setLanguageValue(e.value)}
								placeholder={t('SELECT_LANGUAGE')}
							/>
						</div>
					</div>
					<div className="p-col-8">
						<div className="p-field">
							{!multipleLines && (
								<InputText
									type="text"
									disabled={languageValue.length === 0}
									value={textValue}
									onChange={(e) => setTextValue(e.target.value)}
								/>
							)}
							{multipleLines && (
								<InputTextarea
									disabled={languageValue.length === 0}
									value={textValue}
									onChange={(e) => setTextValue(e.target.value)}
									autoResize
								/>
							)}
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default MultilingualEntriesTable;
