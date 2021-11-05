import React from 'react'

function WorkEntry({entry}) {

  return(
    <ul key={entry.ID} style={{ height: 200, width: '100%', background: '#EEE', padding: '5px', listStyle: 'none'}}>
      <li><a href={entry.Href} rel='noopener noreferrer' target='__blank'>{entry.Company}</a> ({entry.Location}) - {entry.Start_Date} - {entry.End_Date}</li>
      <li><b>{entry.Title}</b></li>
      <li>{entry.Description}</li>
    </ul>
  )
}

export default WorkEntry;