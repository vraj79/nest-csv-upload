import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
function App() {
  const [columnCount, setColumnCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== 'text/csv') {
        setError('Only CSV files are allowed');
        return;
      }

      const formData = new FormData();
      formData.append('csv', file);

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8080/upload-csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setColumnCount(response.data.columnCount);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Upload CSV File</h1>
      <div className="file-input-container">
        <label htmlFor="csv-file" className="file-input-label">
          Select a CSV file
        </label>
        <input
          id="csv-file"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {columnCount !== null && (
        <div className="result">
          <h2>Number of Columns: {columnCount}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
