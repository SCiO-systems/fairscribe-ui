import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import MultipleTextEntriesTable from '../../../../../../components/MultipleTextEntriesTable';

const DataverseFields = (props) => {
	const { setBody, body } = props;
	const { t } = useTranslation();
	const [repositoryName, setRepositoryName] = useState(body.name || '');
	const [repositoryEndpoint, setRepositoryEndpoint] = useState(body.api_endpoint || '');
	const [repositoryClientSecret, setRepositoryClientSecret] = useState(body.client_secret || '');
	const [dataverseCollections, setDataverseCollections] = useState([{ value: 'root' }]);

	useEffect(
		() => {
			const newBody = {
				name: repositoryName,
				type: 'dataverse',
				api_endpoint: repositoryEndpoint.replace(/\/$/, ''),
				client_secret: repositoryClientSecret,
				metadata: JSON.stringify({ collections: dataverseCollections }),
			};
			setBody(newBody);
		}, [repositoryName, repositoryEndpoint, repositoryClientSecret, dataverseCollections]
	);

	return (
		<div className="container">
			<div className="p-col-6 column">
				<div className="field">
					<label htmlFor="repositoryName">{t('REPOSITORY_NAME')}</label>
					<InputText
						id="repositoryName"
						type="text"
						value={repositoryName}
						onChange={(e) => setRepositoryName(e.target.value)}
						required
					/>
				</div>
				<div className="field">
					<label htmlFor="repositoryEndpoint">{t('REPOSITORY_API_ENDPOINT')}</label>
					<InputText
						id="repositoryEndpoint"
						type="text"
						value={repositoryEndpoint}
						placeholder="https://example.com/api"
						onChange={(e) => setRepositoryEndpoint(e.target.value)}
						required
					/>
				</div>
				<div className="field">
					<label htmlFor="repositoryClientSecret">{t('REPOSITORY_CLIENT_SECRET')}</label>
					<InputText
						id="repositoryClientSecret"
						type="text"
						value={repositoryClientSecret}
						onChange={(e) => setRepositoryClientSecret(e.target.value)}
						required
					/>
				</div>
			</div>
			<div className="p-col-6 column">
				<div className="field">
					<MultipleTextEntriesTable
						className="p-mt-4"
						helpText={t('DATAVERSE_COLLECTIONS_HELP_TEXT')}
						header={t('DATAVERSE_COLLECTIONS')}
						mode="edit"
						data={dataverseCollections}
						onAddItem={(entry) =>
							setDataverseCollections(
								[...dataverseCollections, { value: entry }]
							)
						}
						onDeleteItem={(e) => {
							if (e.value === 'root') {
								return;
							}
							setDataverseCollections(
								dataverseCollections.filter((dc) => dc.value !== e.value)
							);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default DataverseFields;
