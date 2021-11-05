import React from 'react';
import { getter } from '../API/api'

function Education({returnFormattedDate}) {
  
  const [ education, setEducation ] = React.useState()

  React.useEffect(() => {
    getter(setEducation, '/api/education')
  }, [])

  return(
    <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
        <h3>Education:</h3>
        {
          education?.map( entry =>
            <ul key={entry.ID}>
              <li><a href={entry.Href} rel='noopener noreferrer' target='_blank'>{entry.Institution}</a></li>
              <li>{entry.Start_Date === null ? null : returnFormattedDate(entry.Start_Date) + '-'}{returnFormattedDate(entry.End_Date)}</li>
              <li>{entry.Recieved}</li>
            </ul>
          )
        }
      </div>
  )
}

export default Education;