import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import './styles.css';
import { Button } from 'primereact/button';
import ResourcesService from '../../../../../../../../../../../../../../services/resourcesService';

const ExcelData = (props) => {
	const { uploadedFile, setData, setActiveIndex, source, setSource, target, setTarget } = props;

	useEffect(() => {
		ResourcesService.getResourceFileHeaders(uploadedFile.id, '')
			.then((res) => {
				const allSheets = [];
				res.map((item) => {
					allSheets.push({
						name: item.name,
						data: item.headers,
					});
				});
				if (!source.length && !target.length) {
					setSource(allSheets);
				}
			});
	}, []);

	const itemTemplate = (item) => {
		return (
			<p>{item.name}</p>
		);
	};

	const renderSheets = () => {
		const onChange = (event) => {
			setSource(event.source);
			setTarget(event.target);
			console.log(event.target);
			setData(event.target);
		};

		return (
			<PickList
				source={source}
				target={target}
				onChange={onChange}
				itemTemplate={itemTemplate}
				breakpoint="600px"
				sourceHeader="Available"
				targetHeader="Selected"
				sourceStyle={{ height: '30rem' }}
				targetStyle={{ height: '30rem' }}
			/>
		);
	};

	return (
		<div className="excel">
			<div className="content">
				<h3>Select sheets</h3>
				<div className="sheets">
					{renderSheets()}
				</div>
			</div>
			<Button label="Next" onClick={() => setActiveIndex(1)} disabled={!target.length} />
		</div>
	);
};

export default ExcelData;
