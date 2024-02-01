import React, { useEffect, useState } from 'react';
import { Steps } from 'primereact/steps';
import { TabularData, ExcelData, Annotation } from './components';
import './styles.css';

const DataAnnotationTool = (props) => {
	const { setResourceFiles, uploadedFile, teamId, resourceId, setToggleAnnotationDialog } = props;
	const [currentStep, setCurrentStep] = useState('');
	const [activeIndex, setActiveIndex] = useState(0);
	const [data, setData] = useState([]);

	const [delimiter, setDelimiter] = useState('');
	const [quotes, setQuotes] = useState('');

	const [source, setSource] = useState([]);
	const [target, setTarget] = useState([]);

	const type = uploadedFile?.filename?.split('.')?.pop();

	const tabularItems = [
		{
			label: 'Configure',
		},
		{
			label: 'Annotation',
		},
	];

	useEffect(
		() => {
			return () => setData([]);
		}, []
	);

	useEffect(
		() => {
			switch (type) {
			case 'csv': {
				switch (activeIndex) {
				case 0: setCurrentStep('tabular'); break;
				case 1: setCurrentStep('annotation'); break;
				}
				break;
			}
			case 'xls': {
				switch (activeIndex) {
				case 0: setCurrentStep('excel'); break;
				case 1: setCurrentStep('annotation'); break;
				}
				break;
			}
			case 'xlsx': {
				switch (activeIndex) {
				case 0: setCurrentStep('excel'); break;
				case 1: setCurrentStep('annotation'); break;
				}
				break;
			}
			default: break;
			}
		}, [activeIndex]
	);

	const renderStep = () => {
		switch (currentStep) {
		case 'tabular': return (
			<TabularData
				uploadedFile={uploadedFile}
				data={data}
				setData={setData}
				setActiveIndex={setActiveIndex}
				delimiter={delimiter}
				setDelimiter={setDelimiter}
				quotes={quotes}
				setQuotes={setQuotes}
			/>
		);
		case 'excel': return (
			<ExcelData
				uploadedFile={uploadedFile}
				data={data}
				setData={setData}
				setActiveIndex={setActiveIndex}
				source={source}
				setSource={setSource}
				target={target}
				setTarget={setTarget}
			/>
		);
		case 'annotation': return <Annotation setResourceFiles={setResourceFiles} setToggleAnnotationDialog={setToggleAnnotationDialog} filename={uploadedFile.filename} data={data} setActiveIndex={setActiveIndex} teamId={teamId} resourceId={resourceId} />;
		default: return null;
		}
	};

	return (
		<div className="annotation-widget">
			<Steps model={tabularItems} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly />
			{renderStep()}
		</div>
	);
};

export default DataAnnotationTool;
