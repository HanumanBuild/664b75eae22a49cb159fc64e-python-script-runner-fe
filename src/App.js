const REACT_APP_PYTHON_SCRIPT_RUNNER_BE_URL = 'https://yzyuuma.srv.hanuman.build';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [script, setScript] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${REACT_APP_PYTHON_SCRIPT_RUNNER_BE_URL}/run-script`, { script });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error running script:', error);
      setOutput('Error running script');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Run Python Script</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="script">
              Python Script
            </label>
            <textarea
              id="script"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows="10"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Run Script
            </button>
          </div>
        </form>
        {output && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Output:</h2>
            <pre className="bg-gray-200 p-4 rounded">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;