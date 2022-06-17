import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [success, setSuccess] = useState(false);
  
  // Checks if the server is running
  useEffect(() => {
    fetch('test', { method: "GET" } )
      .then((response) => {
        const success = response.status == 200 ? true : false;
        setSuccess(success);
      });
  }, []);
  
  return (
    <div className="App">
      {success ? "Successfully connected to server!" : "Unable to connect to server, is the server running?"}
    </div>
  );
}

export default App;
