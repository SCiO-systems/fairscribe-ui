import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

export const SCHEME_ORCID = 'ORCID';
export const SCHEME_ROR = 'ROR';

const schemes = [
	{
		label: 'Individual',
		value: SCHEME_ORCID,
	},
	{
		label: 'Organisation',
		value: SCHEME_ROR,
	},
];

const OrgsPersonsEntities = ({
	mode,
	title,
	entries,
	setEntries,
	defaultScheme,
	className,
	onAutoComplete,
	onSelectAutoComplete,
	itemTemplate,
	mandatory,
}) => {
	const { t } = useTranslation();
	const [fullName, setFullName] = useState('');
	const [shortName, setShortName] = useState('');
	const [id, setId] = useState('');
	const [url, setUrl] = useState('');
	const [email, setEmail] = useState('');
	const [scheme, setScheme] = useState(defaultScheme || '');
	const [autocomplete, setAutocomplete] = useState(null);
	const [suggestions, setSuggestions] = useState([]);
	const [newValueDialog, setNewValueDialog] = useState(false);

	useEffect(() => {
		if (autocomplete) {
			setFullName(autocomplete?.fullname);
			setShortName(autocomplete?.shortname);
			setEmail(autocomplete?.email);
			setUrl(autocomplete?.url);
			setId(autocomplete?.id);
		}
	}, [autocomplete]);

	useEffect(() => {
		setFullName('');
		setShortName('');
		setId('');
		setUrl('');
		setEmail('');
  }, [scheme]); // eslint-disable-line

	const getUrlByIdAndScheme = () => {
		if (id === '') {
			return '';
		}
		if (scheme === SCHEME_ORCID) {
			return `https://orcid.org/${id}`;
		}
		if (scheme === SCHEME_ROR) {
			return `https://ror.org/${id}`;
		}
		return '';
	};

	const addEntry = () => {
		const filtered = entries.filter((e) => {
			if (id === '') {
				return true;
			}
			return e.agent_ids[0].value !== id;
		});
		setEntries([
			...filtered,
			{
				full_name: fullName,
				short_name: shortName,
				url: url.length === 0 ? getUrlByIdAndScheme() : url,
				email,
				agent_ids: [{ scheme, value: id }],
			},
		]);
		setId('');
		setFullName('');
		setShortName('');
		setEmail('');
		setUrl('');
	};

	const removeEntry = (identifier) => {
		setEntries(entries.filter((e) => e.agent_ids[0].value !== identifier));
	};

	const idTemplate = ({ agent_ids: ids }) => (
		<span>
			<strong>{ids[0]?.scheme}</strong>: {ids[0]?.value}
		</span>
	);

	const urlTemplate = (rowData) => <span style={{ wordBreak: 'break-all' }}>{rowData?.url}</span>;

	const deleteTemplate = (rowData) => (
		<div className="p-text-right">
			<Button
				className="p-button-danger"
				icon="pi pi-trash"
				onClick={() => removeEntry(rowData?.agent_ids[0]?.value)}
			/>
		</div>
	);

	const headerTemplate = () => {
		return (
			<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				{mandatory ? <p style={{ color: 'red', margin: '0' }}>{title} *</p> : <p style={{ margin: '0' }}>{title}</p>}
				<Button label={t('ADD')} icon="pi pi-plus" onClick={() => setNewValueDialog(true)} style={{ width: 'fit-content' }} />
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
						addEntry();
						setNewValueDialog(false);
					}}
					disabled={!scheme || !fullName}
				/>

			</div>
		);
	};

	return (
		<div className={className || 'p-mb-4'}>
			<DataTable
				header={headerTemplate}
				emptyMessage=""
				value={entries}
				style={{ wordBreak: 'break-word' }}
			>
				<Column field="full_name" header={t('FULLNAME')} />
				<Column field="short_name" header={t('SHORTNAME')} />
				<Column
					field="url"
					header={t('URL')}
					body={urlTemplate}
				/>
				<Column field="email" header={t('EMAIL')} />
				<Column field="id" header={t('ID')} body={idTemplate} />
				{mode === 'edit' && (
					<Column
						body={deleteTemplate}
					/>
				)}
			</DataTable>
			<Dialog header={title} visible={newValueDialog} style={{ width: '90vw' }} footer={dialogFooter} onHide={() => setNewValueDialog(false)}>
				<div>
					<div className="p-mt-2 p-grid p-formgrid p-fluid p-d-flex p-jc-end">
						{defaultScheme === undefined && (
							<div className="p-col-12">
								<Dropdown
									filter
									filterBy="label"
									id="type"
									name="type"
									disabled={defaultScheme !== undefined}
									value={defaultScheme || scheme || ''}
									options={schemes}
									placeholder="Choose individual or organisation"
									onChange={(e) => setScheme(e.value)}
								/>
							</div>
						)}
					</div>
					{scheme !== '' && (
						<div className="p-mt-3 p-formgrid p-grid p-fluid">
							<div className="p-col-12 p-md-12">
								<div className="p-field">
									<label htmlFor="fullname">{t('FULLNAME')}</label>
									{scheme === SCHEME_ROR ? (
										<AutoComplete
											id="fullname"
											disabled={mode === 'review' || mode === 'view'}
											value={fullName || ''}
											autoComplete="off"
											onChange={(e) => setFullName(e.target.value)}
											completeMethod={(e) => onAutoComplete(e, setSuggestions)}
											itemTemplate={itemTemplate}
											selectedItemTemplate={itemTemplate}
											suggestions={suggestions}
											onSelect={(e) => onSelectAutoComplete(e, setAutocomplete)}
										/>
									) : (
										<InputText
											id="fullname"
											autoComplete="off"
											disabled={mode === 'review' || mode === 'view'}
											value={fullName || ''}
											onChange={(e) => setFullName(e.target.value)}
										/>
									)}
								</div>
							</div>
							{scheme !== SCHEME_ORCID
								? (
									<div className="p-col-12 p-md-6">
										<div className="p-field">
											<label htmlFor="shortname">{t('SHORTNAME')}</label>
											<InputText
												id="shortname"
												disabled={mode === 'review' || mode === 'view' || scheme === SCHEME_ORCID}
												value={shortName}
												onChange={(e) => setShortName(e.target.value)}
											/>
										</div>
									</div>
								)
								: null
							}

							<div className="p-col-12 p-md-6">
								<div className="p-field">
									<label htmlFor="id">{scheme}</label>
									<InputText
										id="id"
										disabled={mode === 'review' || mode === 'view'}
										value={id}
										onChange={(e) => setId(e.target.value)}
									/>
								</div>
							</div>
							<div className="p-col-12 p-md-6">
								<div className="p-field">
									<label htmlFor="url">{t('URL')}</label>
									<InputText
										id="url"
										disabled={mode === 'review' || mode === 'view'}
										value={url}
										onChange={(e) => setUrl(e.target.value)}
									/>
								</div>
							</div>
							<div className="p-col-12 p-md-6">
								<div className="p-field">
									<label htmlFor="email">{t('EMAIL')}</label>
									<InputText
										id="email"
										disabled={mode === 'review' || mode === 'view'}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</Dialog>
		</div>
	);
};

export default OrgsPersonsEntities;
