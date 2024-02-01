import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { read, utils } from 'xlsx';
import './styles.css';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import ResourcesService from '../../../../../../../../../../../../../../services/resourcesService';

const TabularData = (props) => {
	const { uploadedFile, data, setData, setActiveIndex, delimiter, setDelimiter, quotes, setQuotes } = props;

	const [tableData, setTableData] = useState({ data: [], headers: [] });

	const prepareFile = async (changeSheet) => {
		ResourcesService.getResourceFileHeaders(uploadedFile.id, delimiter)
			.then((res) => {
				const newData = [
					{
						name: res[0].name,
						data: res[0].headers,
					},
				];
				const newTableRows = [];
				const newTableDataHeaders = res[0].headers;
				const newTableData = {
					data: newTableRows,
					headers: newTableDataHeaders,
				};
				setTableData(newTableData);
				setData(newData);
				if (changeSheet) {
					setActiveIndex(1);
				}
			});
	};

	const renderColumns = () => {
		if (tableData.headers.length) {
			return tableData.headers.map((item) => {
				return (
					<Column field={item.header} header={item.header} />
				);
			});
		}
		return null;
	};

	useEffect(
		() => {
			setTableData({ data: [], headers: [] });
		}, [delimiter, quotes]
	);

	return (
		<div className="tabular">
			<div className="configuration">
				<div className="fields">
					<div className="section">
						<p>Delimiter</p>
						<Dropdown value={delimiter} options={[';', ',', '<space>', '<tab>']} onChange={(e) => setDelimiter(e.value)} />
					</div>
					<div className="section">
						<p>Quotes</p>
						<Dropdown value={quotes} options={['\'', '"']} onChange={(e) => setQuotes(e.value)} />
					</div>
				</div>
				{/* eslint-disable-next-line no-unsafe-optional-chaining */}
				<Button
					label="Preview"
					onClick={() => {
						prepareFile();
					}}
					disabled={!delimiter}
				/>
				<DataTable value={tableData.data} emptyMessage=" ">
					{renderColumns()}
				</DataTable>
			</div>
			<Button
				label="Next"
				onClick={() => {
					prepareFile(1);
				}}
				disabled={!data.length}
			/>
		</div>
	);
};

export default TabularData;
