import React from 'react';

const JsonInputForm = ({
  jsonInput,
  setJsonInput,
  jsonError,
  isLoading,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="jsonInput">Enter JSON:</label>
        <textarea
          id="jsonInput"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"example": "value", "number": 42}'
          rows={6}
        />
        {jsonError && <div className="error-message">{jsonError}</div>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

export default JsonInputForm;