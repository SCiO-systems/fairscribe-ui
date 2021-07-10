import React, { useState, useContext, useEffect } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { ToastContext } from '../../store';
import { searchGrid } from '../../services/integrations';

const GridAutoComplete = ({ onChange }) => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);
  const { setError } = useContext(ToastContext);

  useEffect(() => {
    if (typeof selectedResult === 'object' && selectedResult !== null) {
      onChange(selectedResult);
    }
  }, [selectedResult, onChange]);

  const handleError = (e) => {
    let error = e && e.message;
    const statusCode = e.response && e.response.status;
    error =
      statusCode === 422
        ? e.response.data.errors[Object.keys(e.response.data.errors)[0]][0]
        : e.response.data.error;
    setError('Error', error);
  };

  const resultTemplate = (item) => `${item.name} [ID: ${item.agent_id}]`;

  const handleSearch = async (event) => {
    try {
      const { suggestions } = await searchGrid(event.query);
      setResults(suggestions);
    } catch (error) {
      handleError(error);
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
