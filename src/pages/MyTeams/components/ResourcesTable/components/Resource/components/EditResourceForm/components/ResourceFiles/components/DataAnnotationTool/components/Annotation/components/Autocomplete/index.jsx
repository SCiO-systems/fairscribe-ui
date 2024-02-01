import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import IntegrationService
	from '../../../../../../../../../../../../../../../../services/integrationService';

const Autocomplete = (props) => {
	const { sheetData, userInput, setUserInput, rowData } = props;

	const [selectedTerm, setSelectedTerm] = useState('');
	const [filteredTerms, setFilteredTerms] = useState('');

	let timer;

	useEffect(
		() => {
			const temp = userInput.find((item) => item.sheet === sheetData.name);
			if (temp) {
				const term = temp.data.find((item) => item.header === rowData.header);
				if (term) {
					setSelectedTerm({ variable_short_name_ui: term.term, variable_definition: term.description, variable_code: term?.code });
				} else {
					setSelectedTerm('');
				}
			} else {
				setSelectedTerm('');
			}
		}, [sheetData]
	);

	useEffect(
		() => {
			if (selectedTerm.variable_short_name_ui) {
				const temp = { header: rowData.header, term: selectedTerm?.variable_short_name_ui, description: selectedTerm?.variable_definition, code: selectedTerm?.variable_code };
				let newRowUserInput = [temp];

				const sheetUserInput = userInput.find((item) => item.sheet === sheetData.name);
				if (sheetUserInput) {
					newRowUserInput = sheetUserInput.data.filter((item) => item.header !== rowData.header);
					newRowUserInput = [...newRowUserInput, temp];
				}
				let newUserInput = userInput.filter((item) => item.sheet !== sheetData.name);
				newUserInput = [...newUserInput, { sheet: sheetData.name, data: newRowUserInput }];
				console.log(newUserInput);
				setUserInput([...newUserInput]);
			}
		}, [selectedTerm]
	);

	const suggestTerm = (event) => {
		if (event.query.trim().length) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				IntegrationService.autosuggestTerm(event.query.trim())
					.then((res) => {
						setFilteredTerms(res);
					});
			}, 300);
		} else {
			setFilteredTerms([]);
		}
	};

	return (
		<AutoComplete
			value={selectedTerm}
			suggestions={filteredTerms}
			completeMethod={suggestTerm}
			onChange={(e) => setSelectedTerm(e.value)}
			field="variable_short_name_ui"
		/>
	);
};

export default Autocomplete;
