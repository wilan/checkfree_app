import './App.css';
import React, { useState, useEffect } from 'react';
import FunctionClick from './FunctionClick';


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
  const [success, setSuccess] = useState(false);
  /*const [lyricsItem, setLyricsItem] = useState(null);
  const[loading, setloading] = useState(false);

  const lyricFunction = async () => {
    try {
      const data = await axios
      .get()
      .then(res => {
        console.log(res)
        setLyricsItem(res.data.lyrics);
      });
    } catch (e) {
        console.log(e)
    }
  }
  useEffect(() => {
    lyricFunction() 
  }, []); */
  // Checks if the server is running
  useEffect(() => {
    fetch2("list").then((response) => {
      const success = response.status === 200 ? true : false;
      setSuccess(success);
      console.log(response);
    });
  }, []);

  return (
    <div className="App">
      <FunctionClick />
      <table style={{ marginBottom: "20px"}} >
        <thead>
            <tr>
                <td>List</td>
                <td></td>
            </tr>
        </thead>
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


