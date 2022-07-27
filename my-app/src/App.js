import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [success, setSuccess] = useState(false);
  
  // Checks if the server is running
  useEffect(() => {
    fetch('test', { method: "GET" } )
      .then((response) => {
        const success = response.status === 200 ? true : false;
        setSuccess(success);
      });
  }, []);

  return (
    <div className="App">
         <table style={{ "margin-bottom": "20px"}} >
      <th>
          <tr>
              <td>List</td>
              <td></td>
          </tr>
      </th>
      <tbody>
          <tr>
              <td>Item 1</td>
              <td><button>X</button></td>
          </tr>
          <tr>
              <td>Item 2</td>
              <td><button>X</button></td>
          </tr>
          <tr>
              <td>...</td>
              <td><button>X</button></td>
          </tr>
      </tbody>
  </table>

  <div style= {{"fomargin-bottom" : "20px"}} >
      <label>Add Item:</label>
      <input type="text" name="name" />
  </div>
  <br/>
  <button>Add</button>
  <button>Refresh List</button>
      {success ? "Successfully connected to server!" : "Unable to connect to server, is the server running?"}
    </div>
  );
}

export default App;


