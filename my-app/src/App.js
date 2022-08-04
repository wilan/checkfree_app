import './App.css';
import React, { useState, useEffect } from 'react';

const fetch2 = (path, params = null) => {
  if (params) {
    path = path + "?" + new URLSearchParams(params);
  }
  return fetch(path, {method: "GET"}).then(async (response) => {
    return response.body.getReader().read().then(({_, value}) => {
      const body = new TextDecoder().decode(value);
      return {status: response.status, body};
    });
  });
};

const App = () => { 

  const [list, setList] = React.useState([])
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetch2("list").then((response) => {
      const success = response.status === 200 ? true : false;
      setSuccess(success); 
      const newList = response.body.split("-");
      setList(newList);
      <newList key={list.toString()} value={list} />
    });
  }, []);

  return (
    <div className="App">
      <table style={{ marginBottom: "20px"}} >
        <thead>
            <tr>
                <td>List</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
          {list.map((items) => (
            <><tr>
              <td>{items}</td>
              <td><button>X</button></td>
            </tr></>
          ))}
        </tbody>
      </table>
      <div style= {{ marginBottom : "20px"}} >
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


