import React, { Component } from 'react';

//{id: , href:'', text:'', description:'', tech:'', },
const data = [
  {id: 1, href:'http://frozenspade.tv', text:'Frozenspade.tv', description:'A website for the Twitch streamer and Speedrunner Frozenspade.', tech:'React, 3rd Party APIs', },
  {id: 2, href:'http://assist.to', text:'Assist.TO', description:'A prototype build for an esports tournament management and analytical platform. (Server is currently turned off)', tech:'React, Node, Express, Postgres, AWS', },
  {id: 3, href:'https://digitalglovebox.herokuapp.com/', text:'Digital Glovebox', description:'Capstone project for DevPoint Labs, built in collaboration with 3 others.', tech:'Ruby-on-Rails, React, Postgres', },
];

class Websites extends Component {

  render() {
    return(
      <div className='portfolio'>
        <h3>Websites:</h3>
        {
            data.map( entry => 
              <ul key={entry.id}>
                <li><a href={entry.href} target='_blank' rel='noopener noreferrer'>{entry.text}</a></li>
                <li>{entry.description}</li>
                <li>Tech: {entry.tech}</li>
              </ul>
            )
          }
      </div>
    )
  }
}

export default Websites;