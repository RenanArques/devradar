import React, { useState, useEffect } from 'react';

import './style.css';

function DevForm( {onSubmit} ) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    )
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithubUsername('');
        setTechs('');
    }

    return(
        <form onSubmit={handleSubmit}>
          <div>
            <div className="input-container">
              <input 
              name="github_username" 
              id="github_username" 
              placeholder="Usuário do Github" 
              required 
              value={github_username} 
              onChange={e => setGithubUsername(e.target.value)} />
            </div>

            <div className="input-container">
              <input 
              name="techs" 
              id="techs"
              placeholder="Tecnologias" 
              required 
              value={techs} 
              onChange={e => setTechs(e.target.value)} />
            </div>
            
            <div className="input-group">
              <div className="input-container">
                <input 
                name="latitude" 
                id="latitude"
                placeholder="Latitude"
                required 
                type="number"
                value={latitude} 
                onChange={e => setLatitude(e.target.value)} />
              </div>
              <div className="input-container">
                <input 
                name="longitude" 
                id="longitude"
                placeholder="Longitude"
                required 
                type="number"
                value={longitude} 
                onChange={e => setLongitude(e.target.value)} />
              </div>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm;