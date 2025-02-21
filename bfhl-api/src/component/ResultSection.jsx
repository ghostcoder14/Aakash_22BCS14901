import React from 'react';

const ResultsSection = ({
  apiResponse,
  selectedOptions,
  handleOptionChange,
}) => {
  // Process and filter response data based on selected options
  const getFilteredResponse = () => {
    if (!apiResponse || selectedOptions.length === 0) {
      return null;
    }

    let result = {};

    if (selectedOptions.includes('Alphabets')) {
      // Extract all alphabetic characters
      const allKeys = Object.keys(apiResponse);
      const alphabetKeys = allKeys.filter((key) => /^[a-zA-Z]+$/.test(key));
      alphabetKeys.forEach((key) => {
        result[key] = apiResponse[key];
      });
    }

    if (selectedOptions.includes('Numbers')) {
      // Extract all numeric values
      const allKeys = Object.keys(apiResponse);
      const numberKeys = allKeys.filter((key) => {
        return (
          typeof apiResponse[key] === 'number' || !isNaN(Number(apiResponse[key]))
        );
      });
      numberKeys.forEach((key) => {
        result[key] = apiResponse[key];
      });
    }

    if (selectedOptions.includes('Highest Alphabet')) {
      // Find the key with the highest alphabetical value
      const allKeys = Object.keys(apiResponse).filter((key) =>
        /^[a-zA-Z]+$/.test(key)
      );
      if (allKeys.length > 0) {
        const highestKey = allKeys.sort().pop();
        result['Highest Alphabet'] = {
          key: highestKey,
          value: apiResponse[highestKey],
        };
      }
    }

    return result;
  };

  const filteredResponse = getFilteredResponse();

  return (
    <div className="results-section">
      <h2>Filter Options</h2>
      <div className="filter-options">
        {['Alphabets', 'Numbers', 'Highest Alphabet'].map((option) => (
          <label key={option} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <h2>Response</h2>
      {selectedOptions.length === 0 ? (
        <div className="hint-message">Select filter options to display results</div>
      ) : filteredResponse ? (
        <pre className="json-display">
          {JSON.stringify(filteredResponse, null, 2)}
        </pre>
      ) : (
        <div className="no-results">No matching data found</div>
      )}
    </div>
  );
};

export default ResultsSection;