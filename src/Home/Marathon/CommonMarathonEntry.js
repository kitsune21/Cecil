import React from 'react'
import { getter } from '../../API/api'

function CommonMarathonEntry({marathon}) {

  const [ entries, setEntries ] = React.useState([])
  const [ display, setDisplay ] = React.useState(false)

  React.useEffect(() => {
    if(marathon.ID) {
      getter(setEntries, `marathon/common-marathons/entries/${marathon.ID}`)
    }
  }, [marathon.ID])

  function calculateMinutes(length) {
    if(length % 60 < 10) {
      return `0${length % 60}`
    } else {
      return `${length % 60}`
    }
  }

  return(
    <div>
      <button onClick={() => setDisplay(!display)}>{marathon.Title ? marathon.Title : "Cecil Rank Marathon"} | {parseInt(marathon.Total_Length / 60)}:{calculateMinutes(marathon.Total_Length)} hours</button>
      {
        display ?
        <ul>
        {
          marathon.ID ?
            entries?.map(entry =>
              <li key={entry.ID}>{entry.Title} | {parseInt(entry.Length / 60)}:{calculateMinutes(entry.Length)} hours</li>  
            )
          : <p>Please see "Movie Reviews" for the list</p>
        }
        </ul> : null
      }
    </div>
  )
}

export default CommonMarathonEntry