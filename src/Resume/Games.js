import React, { Component } from 'react';

//{id: , href:'', text:'', description:'', released:''},
const data = [
  {id: 1, href:'https://kitsune-23.itch.io/one-will-rise', text:'One Will Rise', description:'A 2-D fighting game where you only have one health left. Built as part of the GMTK game{jam} 2019', released:'August 4th, 2019'},
];

class Games extends Component {

  render() {
    return(
      <div>
        <h3>Games:</h3>
        {
          data.map( entry =>
            <ul key={entry.id}>
              <li><a href={entry.href} rel='noopener noreferrer' target='_blank'>{entry.text}</a></li>
              <li>{entry.description}</li>
              <li>Released: {entry.released}</li>
            </ul>
          )
        }
      </div>
    )
  }
}

export default Games;