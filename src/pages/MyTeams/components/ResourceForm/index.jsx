import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PickList } from 'primereact/picklist';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResourcesService from '../../../../services/resourcesService';
import TeamsService from '../../../../services/teamsService';
import { ToastContext, UserContext } from '../../../../store';
import { handleError } from '../../../../utilities/errors';
import IntegrationService from '../../../../services/integrationService';

const ResourceForm = ({ setUpdateData, setTaskFormOpen }) => {
	const { t } = useTranslation();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [guardianId, setGuardianId] = useState('');
	const [type, setType] = useState('dataset');
	const [subtype, setSubtype] = useState('');
	const [resourceTypes, setResourceTypes] = useState([]);
	const [resourceSubtypes, setResourceSubtypes] = useState([]);
	const { firstname, lastname, email, currentlyViewingTeam, id: userId } = useContext(UserContext);
	const { setWarn, setError, setSuccess } = useContext(ToastContext);
	const [authoringTeamMembers, setAuthoringTeamMembers] = useState([]);
	const [selectedAuthoringTeamMembers, setSelectedAuthoringTeamMembers] = useState([]);
	const [reviewTeamMembers, setReviewTeamMembers] = useState([]);
	const [selectedReviewTeamMembers, setSelectedReviewTeamMembers] = useState([]);
	const [guardianData, setGuardianData] = useState(null);

	const handleSubmit = () => {
		const payload = {
			title,
			description,
			type,
			subtype,
			authoring_team: selectedAuthoringTeamMembers.map(({ id }) => id),
			review_team: selectedReviewTeamMembers.map(({ id }) => id),
		};
		TeamsService.createResource(currentlyViewingTeam.id, payload)
			.then((res) => {
				if (guardianData) {
					console.log(guardianData, res.data, 'HEEEY');
					const collections = res.data?.collections;
					const status = 'under_preparation';
					const fallbackTitle = [
						{
							language: {
								name: 'English',
								label: 'English',
								value: 'English',
								iso_code_639_1: 'en',
								iso_code_639_2: 'eng',
							},
							value: res.data?.title,
						},
					];

					const fallbackDescription = [
						{
							language: {
								name: 'English',
								label: 'English',
								value: 'English',
								iso_code_639_1: 'en',
								iso_code_639_2: 'eng',
							},
							value: res.data?.description,
						},
					];
					const metadataRecord = guardianData;
					const record = {
						...metadataRecord,
						title: fallbackTitle,
						description: fallbackDescription,
						dataCORE_version: '1.0',
						dataNODE_id: '',
						providers: [],
						sources: [],
						resource_type: { type, subtype },
					};
					console.log(record);
					ResourcesService.updateResource(currentlyViewingTeam.id, res.data.id, {
						collections: collections.map(({ id }) => id),
						status,
						metadata_record: record,
					})
						.then((response) => {
							setSuccess('Done!', 'Your task has been created.');
							setTaskFormOpen(false);
							setUpdateData((prev) => prev + 1);
						});
				} else {
					console.log(res);
					setSuccess('Done!', 'Your task has been created.');
					setTaskFormOpen(false);
					setUpdateData((prev) => prev + 1);
				}
			})
			.catch((e) => {
				setError(handleError(e));
			});
	};

	const loadResourceTypes = () => {
		ResourcesService.getResourceTypes()
			.then((res) => {
				const types = res;
				let defaultTypeValue = types[0]?.value || '';
				let defaultSubtypeValue = types[0]?.subtypes[0]?.value || '';
				const tempType = res.find((item) => item.name === 'Dataset');
				if (tempType) {
					defaultTypeValue = tempType.value;
					setResourceSubtypes(tempType.subtypes);
					const tempSubType = tempType.subtypes.find((item) => item.name === 'Dataset / Tabular');
					if (tempSubType) {
						defaultSubtypeValue = tempSubType.value;
					}
				} else {
					setResourceSubtypes(types[0]?.subtypes || []);
				}
				setResourceTypes(types || []);
				setType(defaultTypeValue);
				setSubtype(defaultSubtypeValue);
			})
			.catch((e) => {
				setError(handleError(e));
			});
	};

	useEffect(() => {
		const loggedInUser = { firstname, lastname, email, id: userId };
		setAuthoringTeamMembers(currentlyViewingTeam?.users || []);
		setReviewTeamMembers(currentlyViewingTeam?.users || []);
		setSelectedAuthoringTeamMembers([loggedInUser]);
		setSelectedReviewTeamMembers([currentlyViewingTeam?.owner].filter(Boolean));
		loadResourceTypes();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const subtypes = resourceTypes.filter(({ value }) => value === type)?.pop()?.subtypes || [];
		const defaultSubtypeValue = subtypes[0]?.value || '';
		setResourceSubtypes(subtypes || []);
		setSubtype(defaultSubtypeValue);
  }, [type]); // eslint-disable-line

	const onAuthoringTeamChange = ({ source, target }) => {
		if (source.find(({ id }) => id === userId)) {
			// the creator of the task is always in the authoring team
			setWarn('Warning!', t('AUTHORING_TASK_OWNER_WARNING'));
			return;
		}
		setAuthoringTeamMembers(source);
		setSelectedAuthoringTeamMembers(target);
	};

	const onReviewTeamChange = ({ source, target }) => {
		if (source.find(({ id }) => id === userId)) {
			// the team owner is always in the review team
			setWarn('Warning!', t('REVIEW_TEAM_OWNER_WARNING'));
			return;
		}
		setReviewTeamMembers(source);
		setSelectedReviewTeamMembers(target);
	};

	return (
		<Fieldset className="p-my-2 p-col-12 p-md-12" legend={t('NEW_RESOURCE')}>
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
			<div className="p-fluid p-grid p-justify-start">
				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="p-field">
						<label htmlFor="resource-guardian-id">GARDIAN Id</label>
						<div className="p-col-12 p-md-12 p-lg-12">
							<InputText
								id="resource-guardian-id"
								value={guardianId}
								onChange={(e) => setGuardianId(e.target.value)}
							/>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', padding: '6px', gap: '24px', width: '100%' }}>
							<Button
								label="Fetch data with GARDIAN Id"
								style={{ width: 'fit-content' }}
								disabled={!guardianId}
								onClick={() => {
									IntegrationService.getResourceByGuardianId(guardianId)
										.then((res) => {
											if (res.title) {
												if (res.title.length) {
													if (res.title[0].value) {
														setTitle(res.title[0].value);
													}
												}
											}
											if (res.description) {
												if (res.description.length) {
													if (res.description[0].value) {
														setDescription(res.description[0].value);
													}
												}
											}
											setGuardianData(res);
										});
								}}
							/>
							<a style={{ width: 'fit-content' }} className="p-button" href="https://gardian.bigdata.cgiar.org" target="_blank" rel="noopener noreferrer">GARDIAN Search</a>
						</div>
					</div>
				</div>
			</div>
			<div className="p-fluid p-grid p-justify-start">
				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="p-field">
						<label htmlFor="resource-type">{t('RESOURCE_TYPE')}</label>
						<Dropdown
							id="resource-type"
							filter
							filterBy="label"
							value={type}
							options={resourceTypes?.map(({ name, value }) => ({
								label: name,
								value,
							}))}
							placeholder={t('RESOURCE_TYPE')}
							onChange={(e) => setType(e.value)}
						/>
					</div>
					<div className="p-field">
						<label htmlFor="resource-subtype">{t('RESOURCE_SUBTYPE')}</label>
						<Dropdown
							id="resource-subtype"
							filter
							filterBy="label"
							value={subtype}
							options={
								resourceSubtypes?.map(({ name, value }) => ({
									label: name,
									value,
								})) || []
							}
							placeholder={t('RESOURCE_SUBTYPE')}
							onChange={(e) => setSubtype(e.value)}
						/>
					</div>
				</div>
			</div>
			<div className="p-fluid p-grid p-justify-start">
				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="p-field">
						<label htmlFor="authoring-team">{t('RESOURCE_METADATA_AUTHORING_TEAM')}</label>
						<PickList
							id="authoring-team"
							source={authoringTeamMembers}
							target={selectedAuthoringTeamMembers}
							itemTemplate={(item) => `${item.firstname} ${item.lastname}`}
							onChange={onAuthoringTeamChange}
							showSourceControls={false}
							showTargetControls={false}
							sourceHeader={t('TEAM_MEMBERS')}
							targetHeader={t('RESOURCE_METADATA_AUTHORING_TEAM')}
						/>
					</div>
				</div>
			</div>
			<div className="p-fluid p-grid p-justify-start">
				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="p-field">
						<label htmlFor="review-team">{t('RESOURCE_METADATA_REVIEW_TEAM')}</label>
						<PickList
							id="review-team"
							source={reviewTeamMembers}
							target={selectedReviewTeamMembers}
							itemTemplate={(item) => `${item.firstname} ${item.lastname}`}
							onChange={onReviewTeamChange}
							showSourceControls={false}
							showTargetControls={false}
							sourceHeader={t('TEAM_MEMBERS')}
							targetHeader={t('RESOURCE_METADATA_REVIEW_TEAM')}
						/>
					</div>
				</div>
			</div>
			<div className="p-grid p-justify-start">
				<div className="p-col-12 p-md-12 p-lg-12">
					<div className="p-d-flex">
						<Button
							className="p-button-secondary p-mr-2"
							label={t('CANCEL')}
							icon="pi pi-times"
							onClick={() => setTaskFormOpen(false)}
						/>
						<Button
							icon="pi pi-send"
							label={t('CREATE_TASK_AND_SEND_INVITES')}
							onClick={() => handleSubmit()}
						/>
					</div>
				</div>
			</div>
		</Fieldset>
	);
};

export default ResourceForm;
