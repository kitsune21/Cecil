import React, { Component } from 'react';

//{id: , job_id: null, company:'', href:'', location:'', start:'', end:'', title:'', description:'', },
const data = [
  {id: 1, job_id: null, company:'Entrata', href:'https://www.entrata.com/', location:'Lehi, UT', start:'05/2019', end:'Current', title:'Client Resolution Specialist', description:'Description', },
  {id: 2, job_id: 1, company:'Entrata', href:'https://www.entrata.com/', location:'Lehi, UT', start:'07/2018', end:'05/2019', title:'First Response Specialist', description:'Description', },
  {id: 3, job_id: null, company:'Digicert, Inc', href:'https://www.digicert.com/', location:'Lehi, UT', start:'02/2018', end:'08/2019', title:'Validation Specialist', description:'Description', },
  {id: 4, job_id: null, company:'SkyWest Inc', href:'https://www.skywest.com/', location:'St. George, UT', start:'07/2015', end:'11/2015', title:'Mobile Device Technician', description:'Setup Surface tablets for use as an electronic flight bag for pilots.', },
  {id: 5, job_id: null, company:'Zion Internation Programs', href:'https://zip-usa.com', location:'St. George, UT', start:'07/2014', end:'10/2017', title:'Tour Guide', description:'Assist with groups of high school/middle school Japanese students by coordinating transportation, and teaching English.', },
];

class Work extends Component {

  renderOtherJobs = (myID) => {
    let newEntries = [];
    data.forEach( entry =>
      entry.job_id === myID ? newEntries.push(entry) : null
    )
    if(newEntries){
      return(
        newEntries.map(newEntry =>
          <ul key={newEntry.id}>
            <li><a href={newEntry.href} rel='noopener noreferrer' target='_blank'>{newEntry.company}</a> ({newEntry.location}) - {newEntry.start} - {newEntry.end}</li>
            <li>{newEntry.title}</li>
            <li>{newEntry.description}</li>
          </ul>
        )
     )
    } else {
      return null
    }
  }

  render() {
    return(
      <div className='work'>
          <h3>Work:</h3>
          {
            data.map( entry =>
              !entry.job_id ?
              <ul key={entry.id}>
                <li><a href={entry.href} rel='noopener noreferrer' target='_blank'>{entry.company}</a> ({entry.location}) - {entry.start} - {entry.end}</li>
                <li>{entry.title}</li>
                <li>{entry.description}</li>
                {this.renderOtherJobs(entry.id)}
              </ul>  :
              null
            )
          }
        </div>
    )
  }
}

export default Work;