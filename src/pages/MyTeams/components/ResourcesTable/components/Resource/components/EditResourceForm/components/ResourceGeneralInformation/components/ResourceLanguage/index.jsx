import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ResourceLanguage = ({ mandatory, availableLanguages, setLanguage, language, mode }) => {
	const { t } = useTranslation();
	// TODO: Add the list of languages here.

	return (
		<div className="p-fluid p-formgrid p-grid">
			<div className="p-col-12">
				<div className="p-field">
					{mandatory ? <label htmlFor="resourceCollections" style={{ color: 'red' }}>{t('RESOURCE_LANGUAGE')} *</label> : <label htmlFor="resourceCollections">{t('RESOURCE_LANGUAGE')}</label>}
					<Dropdown
						filter
						filterBy="label"
						id="language"
						disabled={mode !== 'edit'}
						value={language?.name || ''}
						options={availableLanguages.map(({ name }) => ({ label: name, value: name }))}
						onChange={(e) =>
							setLanguage(availableLanguages.filter(({ name }) => name === e.value)?.pop())
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default ResourceLanguage;
