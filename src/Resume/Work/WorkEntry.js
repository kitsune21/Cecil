import React from 'react'

function WorkEntry({entry}) {

  return(
    <div key={entry.ID} style={{ height: 220, width: '100%', background: '#EEE', padding: '5px', listStyle: 'none'}}>
      <p><a href={entry.Href} rel='noopener noreferrer' target='__blank'>{entry.Company}</a> ({entry.Location}) - {entry.Start_Date} - {entry.End_Date}</p>
      <p><b>{entry.Title}</b></p>
      <p>{entry.Description}</p>
    </div>
  )
}

export default WorkEntry;