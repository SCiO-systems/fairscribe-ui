import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './styles.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Autocomplete } from './components';
import ResourcesService from '../../../../../../../../../../../../../../services/resourcesService';

const Annotation = (props) => {
	const { setResourceFiles, setToggleAnnotationDialog, data, setActiveIndex, teamId, resourceId, filename } = props;
	const [sheetData, setSheetData] = useState(data[0] || {});
	const [userInput, setUserInput] = useState([]);
	const autocompleteTemplate = (rowData) => {
		return (
			<Autocomplete sheetData={sheetData} userInput={userInput} setUserInput={setUserInput} rowData={rowData} />
		);
	};

	const descriptionTemplate = (rowData) => {
		const sheetInput = userInput.find((item) => item.sheet === sheetData.name);
		if (sheetInput) {
			const term = sheetInput.data.find((item) => item.header === rowData.header);
			if (term) {
				return <p>{term.description}</p>;
			}
		}
		return (
			<p />
		);
	};
	const renderSheet = () => {
		if (sheetData.data) {
			return (
				<DataTable value={sheetData.data}>
					<Column field="header" header="Data Column" />
					<Column body={autocompleteTemplate} header="Variable" />
					<Column body={descriptionTemplate} header="Description" />
				</DataTable>
			);
		}
		return null;
	};

	return (
		<div className="annotation">
			<div className="annotation-table">
				<div className="dropdown">
					<p>Active Sheet</p>
					<Dropdown value={sheetData} options={data} optionLabel="name" onChange={(e) => setSheetData(e.value)} placeholder="Select a Sheet" />
				</div>
				<div className="sheet">
					{renderSheet()}
				</div>
			</div>
			<div>
				<Button label="Previous" onClick={() => setActiveIndex(0)} />
				<Button
					label="Annotate"
					onClick={() => {
						ResourcesService.uploadAnnotation(teamId, resourceId, {
							filename,
							form_data: userInput,
						})
							.then((res) => {
								setResourceFiles((prev) => [...prev, res.data]);
								setToggleAnnotationDialog(false);
							});
					}
					}
				/>
			</div>
		</div>
	);
};

export default Annotation;
