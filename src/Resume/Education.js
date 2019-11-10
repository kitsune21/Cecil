import React, { Component } from 'react';

//{id: , institution:'', href:'', start:'', end:'', recieved:'', },
const data = [
    {id: 1, institution:'DevPoint Labs', href:'https://www.devpointlabs.com/', start:'Aug 2019', end:'Oct 2019', recieved:'Part-Time Web Development Certificate', },
    {id: 2, institution:'Desert Hills High School', href:'http://dhthunder.org', start:'', end:'May 2011', recieved:'Diploma', },
];

class Education extends Component {

  render() {
    return(
      <div className='education'>
          <h3>Education:</h3>
          {
            data.map( entry =>
              <ul key={entry.id}>
                <li><a href={entry.href} rel='noopener noreferrer' target='_blank'>{entry.institution}</a></li>
                <li>{entry.start === '' ? null : entry.start + '-'}{entry.end}</li>
                <li>{entry.recieved}</li>
              </ul>
            )
          }
        </div>
    )
  }
}

export default Education;