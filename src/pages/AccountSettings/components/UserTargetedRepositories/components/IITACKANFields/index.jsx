import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

const IITACKANFields = (props) => {
	const { setBody, body } = props;
	const { t } = useTranslation();
	const [repositoryName, setRepositoryName] = useState(body.name || '');
	const [repositoryEndpoint, setRepositoryEndpoint] = useState(body.api_endpoint || '');
	const [repositoryClientSecret, setRepositoryClientSecret] = useState(body.client_secret || '');
	const [apiKey, setApiKey] = useState(body.client_secret || '');

	useEffect(
		() => {
			const newBody = {
				name: repositoryName,
				type: 'iita-ckan',
				api_endpoint: repositoryEndpoint.replace(/\/$/, ''),
				client_secret: apiKey,
				api_key: apiKey,
				metadata: JSON.stringify({}),
			};
			setBody(newBody);
		}, [repositoryName, repositoryEndpoint, apiKey]
	);

	return (
		<div className="container">
			<div className="p-col-12 column">
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
					<label htmlFor="apiKey">API key</label>
					<InputText
						id="apiKey"
						type="text"
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
						required
					/>
				</div>
				<div className="field">
					<label htmlFor="repositoryName">Organization ID</label>
					<InputText
						id="repositoryName"
						type="text"
						value={repositoryName}
						onChange={(e) => setRepositoryName(e.target.value)}
						required
					/>
				</div>
				{/* <div className="field"> */}
				{/*	<label htmlFor="repositoryClientSecret">{t('REPOSITORY_CLIENT_SECRET')}</label> */}
				{/*	<InputText */}
				{/*		id="repositoryClientSecret" */}
				{/*		type="text" */}
				{/*		value={repositoryClientSecret} */}
				{/*		onChange={(e) => setRepositoryClientSecret(e.target.value)} */}
				{/*		required */}
				{/*	/> */}
				{/* </div> */}
			</div>
		</div>
	);
};

export default IITACKANFields;
