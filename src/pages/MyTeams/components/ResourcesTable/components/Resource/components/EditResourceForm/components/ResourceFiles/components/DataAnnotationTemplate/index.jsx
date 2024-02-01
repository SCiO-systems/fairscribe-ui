import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';

const DataAnnotationTemplate = ({ currFilename }) => {
	const { t } = useTranslation();

	const getDataAnnotationContent = (currFn) => {
		const currentExtension = currFn?.split('.')?.pop();
		const fileName = currFn.replace(`.${currentExtension}`, '');

		if (!currentExtension || !fileName) {
			return <span className="p-font-bold">-</span>;
		}

		if (!['csv', 'xls', 'xlsx', 'vmpr'].includes(currentExtension)) {
			return <span className="p-text-bold">-</span>;
		}

		if (currentExtension === 'vmpr') {
			return (
				<span className="p-d-flex text-green p-jc-center p-ai-center">
					<i className="pi pi-check text-green bg-green rounded-full p-p-1 p-mr-2" />
				</span>
			);
		}

		return (
			<span className="p-d-flex text-red p-jc-center p-ai-center">
				<i className="pi pi-times text-red bg-red rounded-full p-p-1 p-mr-2" />
			</span>
			// <Button label={t('ANNOTATE_DATASET')} onClick={onClick} />
		);
	};

	return <div className="p-text-center">{getDataAnnotationContent(currFilename)}</div>;
};

export default DataAnnotationTemplate;
