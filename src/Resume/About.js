import React from 'react';

//{id: , href:'', handle:'', service:'', },
const data = [
  {id: 1, href:'https://twitter.com/kitsune_76', handle:'@KiTsuNe_76', service:'Twitter', },
  {id: 2, href:'https://twitch.com/kitsune_23', handle:'twitch.tv/kitsune_23', service:'Twitch', },
  {id: 3, href:'https://linkedin.com/in/cecilthomas23/', handle:'linkedin.com/in/cecilthomas23/', service:'LinkedIn', },
];

function About() {

  return(
    <div className='intro'>
        <h3>About Me:</h3>
        <ul>
          <li>Cecil Thomas</li>
          <li>West Jordan, UT</li>
          <li>me@cecil-thomas.com</li>
          {
            data.map( entry =>
              <li key={entry.id} >{entry.service}: <a href={entry.href} target='_blank' rel='noopener noreferrer'>{entry.handle}</a></li>
            )
          }
        </ul>
      </div>
  )
}

export default About;