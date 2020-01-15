import React from 'react';

import './style.css';

function DevItem({ dev }) {
    return(
        <li>
            <header>
              <img src={dev.avatar_url} alt={dev.name}/>
              <div id="user-header">
                <h2>{dev.name}</h2>
                <span>{dev.techs.join(', ')}</span>
              </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>
              <img src="https://github.githubassets.com/favicon.ico" alt="Github Logo"/>
            </a>
        </li>
    )
}

export default DevItem;