import logo from './logo.svg';
import React, { useState, useEffect } from 'react';

import './App.css';

function App() {


  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [petsEntries, setPetsEntries] = useState([]);

  useEffect(() => {
    fetch('https://localhost:3000/api/list')
      .then(response => response.json())
      .then(data => setPetsEntries(data));
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://localhost:3000/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, owner }),
    })
      .then(response => response.json())
      .then(newEntry => {
        setPetsEntries([newEntry, ...petsEntries]);
        setName('');
        setOwner('');
      });
  };



  return (
    <div className="App">
      <header className="App-header">


        <h1>asdfsdf</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />


          <input
            type="text"
            placeholder="비밀번호"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />

          <button type="submit">남기기</button>

        </form>

        <ul>
          {petsEntries.map(entry => (
            <li key={entry.id}>
              <strong>{entry.name}:</strong> {entry.message} <br />
              <small>{new Date(entry.created_at).toLocaleString()}</small> <br />

            </li>
          ))}

        </ul>


        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
