import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <main>
        <h1>Cadastrar</h1>
        <DevForm onSubmit={handleAddDev} />
      </main>
      <aside>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default App;
