import React, { useState } from 'react';
import JsonInputForm from './component/JsonInputform';
import './App.css';
import ResultsSection from './component/ResultSection';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Validate JSON input
  const validateJson = (input) => {
    try {
      JSON.parse(input);
      setJsonError('');
      return true;
    } catch (error) {
      setJsonError('Invalid JSON format: ' + error.message);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateJson(jsonInput)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setApiResponse(data);
      setSelectedOptions([]); // Reset selections when new data is loaded
    } catch (error) {
      setJsonError('API Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle dropdown selection changes
  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="app-container">
      <h1>API JSON Processor</h1>

      <JsonInputForm
        jsonInput={jsonInput}
        setJsonInput={setJsonInput}
        jsonError={jsonError}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />

      {apiResponse && (
        <ResultsSection
          apiResponse={apiResponse}
          selectedOptions={selectedOptions}
          handleOptionChange={handleOptionChange}
        />
      )}
    </div>
  );
}

export default App;