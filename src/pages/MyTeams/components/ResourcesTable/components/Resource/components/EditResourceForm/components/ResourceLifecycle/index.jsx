import { Calendar } from 'primereact/calendar';
import { Fieldset } from 'primereact/fieldset';
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertDateToFormat, getDateFromFormat } from '../../../../../../../../../../utilities/dates';
import { SimpleNumberField } from './components';
import SimpleTextArea from '../SimpleTextArea';

const ResourceLifecycle = ({ mandatory, initialData, setter, mode }) => {
	const { t } = useTranslation();
	const [version, setVersion] = useState(initialData?.resource_version || 1.0);
	const [versionDescription, setVersionDescription] = useState(
		initialData?.resource_version_description || ''
	);
	const [releaseDate, setReleaseDate] = useState(initialData?.release_date || '');
	const [embargoDate, setEmbargoDate] = useState(initialData?.embargo_date || '');

	useEffect(() => {
		setter(
			version,
			versionDescription,
			convertDateToFormat(releaseDate),
			convertDateToFormat(embargoDate)
		);
  }, [version, versionDescription, releaseDate, embargoDate]); // eslint-disable-line

	const releaseMonthNavigatorTemplate = (e) => (
		<Dropdown
			value={e.value}
			options={e.options}
			onChange={(event) => e.onChange(event.originalEvent, event.value)}
			style={{ lineHeight: 1 }}
		/>
	);

	const releaseYearNavigatorTemplate = (e) => (
		<Dropdown
			value={e.value}
			options={e.options}
			onChange={(event) => e.onChange(event.originalEvent, event.value)}
			className="p-ml-2"
			style={{ lineHeight: 1 }}
		/>
	);

	const embargoMonthNavigatorTemplate = (e) => (
		<Dropdown
			value={e.value}
			options={e.options}
			onChange={(event) => e.onChange(event.originalEvent, event.value)}
			style={{ lineHeight: 1 }}
		/>
	);

	const embargoYearNavigatorTemplate = (e) => (
		<Dropdown
			value={e.value}
			options={e.options}
			onChange={(event) => e.onChange(event.originalEvent, event.value)}
			className="p-ml-2"
			style={{ lineHeight: 1 }}
		/>
	);

	return (
		<Fieldset legend={t('RESOURCE_LIFECYCLE')} className="p-mb-4">
			<SimpleNumberField
				mode={mode}
				numberDecimalDigits={1}
				numberMode="decimal"
				title={t('RESOURCE_VERSION')}
				number={version}
				setNumber={setVersion}
				className="p-mb-4"
				mandatory={mandatory.resource_version}
			/>
			<SimpleTextArea
				mode={mode}
				title={t('VERSION_DESCRIPTION')}
				text={versionDescription}
				setText={setVersionDescription}
				className="p-mb-4"
				mandatory={mandatory.resource_version_description}
			/>
			<div className="p-fluid p-formgrid p-grid">
				<div id="resource-issued-date" className="p-field p-col-12 p-md-6">
					{mandatory.release_date ? <label htmlFor="releaseDate" style={{ color: 'red', margin: '0' }}>{t('RELEASE_DATE')} *</label> : <label htmlFor="releaseDate" style={{ margin: '0' }}>{t('RELEASE_DATE')}</label>}
					<Calendar
						dateFormat="yy-mm-dd"
						disabled={mode === 'review' || mode === 'view' || mode === 'view'}
						showIcon
						showButtonBar
						monthNavigator
						monthNavigatorTemplate={releaseMonthNavigatorTemplate}
						yearNavigator
						yearNavigatorTemplate={releaseYearNavigatorTemplate}
						yearRange="1950:2030"
						id="releaseDate"
						value={getDateFromFormat(releaseDate)}
						onChange={(e) => setReleaseDate(e.value)}
					/>
				</div>
				<div className="p-field p-col-12 p-md-6">
					{mandatory.embargo_date ? <label htmlFor="embargoDate" style={{ color: 'red', margin: '0' }}>{t('EMBARGO_DATE')} *</label> : <label htmlFor="embargoDate" style={{ margin: '0' }}>{t('EMBARGO_DATE')}</label>}
					<Calendar
						dateFormat="yy-mm-dd"
						disabled={mode === 'review' || mode === 'view' || mode === 'view'}
						showIcon
						showButtonBar
						monthNavigator
						monthNavigatorTemplate={embargoMonthNavigatorTemplate}
						yearNavigator
						yearNavigatorTemplate={embargoYearNavigatorTemplate}
						yearRange="1950:2030"
						id="embargoDate"
						value={getDateFromFormat(embargoDate)}
						onChange={(e) => setEmbargoDate(e.value)}
					/>
				</div>
			</div>
		</Fieldset>
	);
};

export default ResourceLifecycle;
