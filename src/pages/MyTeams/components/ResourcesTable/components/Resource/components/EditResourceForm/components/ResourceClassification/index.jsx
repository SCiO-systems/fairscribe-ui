import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import IntegrationService from '../../../../../../../../../../services/integrationService';
import { ToastContext } from '../../../../../../../../../../store';
import { handleError } from '../../../../../../../../../../utilities/errors';
import { getEnglishValue } from '../../../../../../../../../../utilities/transformers';

const defaultVocabulary = { label: 'Free', value: 'free' };

const ResourceClassification = ({ mandatory, header, initialData, setter, mode }) => {
	const { t } = useTranslation();
	const { setError } = useContext(ToastContext);

	const [keywords, setKeywords] = useState(initialData?.keywords || []);
	const [availableVocabularies, setAvailableVocabularies] = useState([defaultVocabulary]);
	const [vocabulary, setVocabulary] = useState('');
	const [kw, setKw] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [newValueDialog, setNewValueDialog] = useState(false);

	const [isExtractLoading, setIsExtractLoading] = useState(false);
	const [extractedTerms, setExtractedTerms] = useState([]);

	const getHumanReadableVocabularyName = (scheme) =>
		availableVocabularies.filter(({ value }) => value === scheme)?.pop()?.label || scheme;

	const extractKeywordsFromTitleAndDescription = async () => {
		setIsExtractLoading(true);
		console.log(initialData);
		const title = getEnglishValue(initialData?.title);
		const description = getEnglishValue(initialData?.description);
		console.log(title, description, 'Title Desc');
		IntegrationService.extractKeywords(`${title} ${description}`)
			.then((terms) => {
				if (terms.length) {
					const temp = [...terms];
					// eslint-disable-next-line camelcase
					const newExtractedTerms = temp.map(({ ontology_name, label, id }) => ({ scheme: ontology_name, value: label, code: id, frequency: '1' }));
					setExtractedTerms([...newExtractedTerms]);
				}
				setIsExtractLoading(false);
			})
			.catch((error) => {
				setError(handleError(error));

				setIsExtractLoading(false);
			});
	};

	const addKeyword = (keyword) => {
		const filtered = keywords.filter(({ scheme, value }) => {
			// Choose the proper value based on if the keyword has a structure or not.
			// We can only have one keyword with the same value and scheme.
			const s =
        keyword?.scheme || getHumanReadableVocabularyName(vocabulary) || defaultVocabulary.value;
			const v = keyword?.value || keyword?.term || keyword;
			if (s === scheme && v === value) {
				return false;
			}
			return true;
		});
		setKeywords([
			...filtered,
			{
				scheme: getHumanReadableVocabularyName(vocabulary) || defaultVocabulary?.value,
				value: keyword?.term || keyword,
				frequency: '1',
				code: keyword?.code || keyword?.id || '',
			},
		]);
	};

	const removeKeyword = (s, v) => {
		setKeywords(
			keywords.filter(({ scheme, value }) => {
				if (s === scheme && v === value) {
					return false;
				}
				return true;
			})
		);
	};

	const triggerAutocomplete = ({ query }) => {
		// If the user has chosen the default vocabulary (aka free).
		if (vocabulary === defaultVocabulary.value || vocabulary === '') {
			setSuggestions([]);
			return;
		}

		IntegrationService.autocompleteTerm(vocabulary, query)
			.then((results) => {
				setSuggestions(results?.length > 0 ? results : []);
			})
			.catch((error) => {
				setError(handleError(error));
			});
	};

	useEffect(() => {
		IntegrationService.listVocabularies()
			.then((response) => {
				setAvailableVocabularies(
					response
						.map(({ human_readable: label, alias: value }) => ({ label, value }))
						.concat(defaultVocabulary)
				);
			})
			.catch((error) => {
				setError(handleError(error));
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setter(keywords);
	}, [keywords]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (extractedTerms?.length > 0) {
			const filtered = extractedTerms?.filter(({ scheme, value }) => {
				if (keywords.some((k) => k?.value === value && k?.scheme === scheme)) {
					return false;
				}
				return true;
			});
			setKeywords([...keywords, ...filtered]);
			setExtractedTerms([]);
		}
  }, [extractedTerms]); // eslint-disable-line

	const schemeTemlate = ({ scheme }) => <span>{getHumanReadableVocabularyName(scheme)}</span>;

	const deleteTemplate = ({ scheme, value }) => (
		<div className="p-text-right">
			<Button
				icon="pi pi-trash"
				className="p-button p-component p-button-danger p-button-icon-only"
				onClick={() => removeKeyword(scheme, value)}
			/>
		</div>
	);

	const headerTemplate = () => {
		return (
			<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				{mandatory.keywords ? <p style={{ color: 'red', margin: '0' }}>{header} *</p> : <p style={{ margin: '0' }}>{header}</p>}
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
						addKeyword(kw);
						setKw('');
						setNewValueDialog(false);
					}}
					disabled={!vocabulary || !kw}
				/>

			</div>
		);
	};

	return (
		<Fieldset id="resource-keywords" legend={t('RESOURCE_CLASSIFICATION')} className="p-mb-4">
			<div className="p-mb-4 p-mt-0 p-text-right">
				<Button
					icon="pi pi-book"
					label="Extract keywords"
					disabled={mode === 'review' || mode === 'view'}
					loading={isExtractLoading}
					onClick={() => extractKeywordsFromTitleAndDescription()}
				/>
			</div>
			<DataTable
				sortField="value"
				sortOrder={1}
				emptyMessage=""
				value={keywords}
				header={headerTemplate}
				// footer={keywordsFooter}
			>
				<Column field="value" header={t('KEYWORD')} />
				<Column
					field="scheme"
					header={t('SCHEME')}
					body={schemeTemlate}
				/>
				{mode === 'edit' && (
					<Column
						body={deleteTemplate}
					/>
				)}
			</DataTable>
			<Dialog header={header} visible={newValueDialog} style={{ width: '90vw' }} footer={dialogFooter} onHide={() => setNewValueDialog(false)}>
				<div>
					<div className="p-formgrid p-grid p-fluid">
						<div className="p-col-3">
							<Dropdown
								filter
								filterBy="label"
								id="type"
								name="type"
								value={vocabulary}
								options={availableVocabularies}
								placeholder="Choose vocabulary"
								onChange={(e) => setVocabulary(e.value)}
							/>
						</div>
						<div className="p-col-7">
							<div className="p-field">
								<AutoComplete
									disabled={mode === 'review' || mode === 'view'}
									name="keyword"
									value={kw}
									minLength="2"
									completeMethod={triggerAutocomplete}
									itemTemplate={(item) => item?.term}
									selectedItemTemplate={(item) => item?.term}
									suggestions={suggestions}
									onChange={(e) => setKw(e?.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
		</Fieldset>
	);
};

export default ResourceClassification;
