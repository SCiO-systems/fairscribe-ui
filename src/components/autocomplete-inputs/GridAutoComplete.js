import { AutoComplete } from 'primereact/autocomplete';
import React, { useContext, useEffect, useState } from 'react';
import { searchGrid } from '../../services/integrations';
import { ToastContext } from '../../store';
import { handleError } from '../../utilities/errors';

const GridAutoComplete = ({ onChange }) => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);
  const { setError } = useContext(ToastContext);

  useEffect(() => {
    if (typeof selectedResult === 'object' && selectedResult !== null) {
      onChange(selectedResult);
    }
  }, [selectedResult, onChange]);

  const resultTemplate = (item) => `${item.name} [ID: ${item.agent_id}]`;

  const handleSearch = async (event) => {
    try {
      const { suggestions } = await searchGrid(event.query);
      setResults(suggestions);
    } catch (error) {
      setError(handleError(error));
    }
  };

  return (
    <AutoComplete
      value={selectedResult}
      suggestions={results}
      field="name"
      completeMethod={handleSearch}
      itemTemplate={resultTemplate}
      selectedItemTemplate={resultTemplate}
      onChange={(e) => setSelectedResult(e.value)}
    />
  );
};

export default GridAutoComplete;
