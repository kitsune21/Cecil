import React from 'react'
import axios from 'axios'
//import MarathonLength from './MarathonLength'

function CommonMarathonEntry({marathon}) {

  const [ entries, setEntries ] = React.useState([])
  const [ display, setDisplay ] = React.useState(false)

  React.useEffect(() => {
    getEntries()
  }, [])

  function getEntries() {
    axios({
      method: 'GET',
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/common-marathons/entries/${marathon.ID}`
    })
    .then(res => {
      setEntries(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  function calculateMinutes(length) {
    if(length % 60 < 10) {
      return `0${length % 60}`
    } else {
      return `${length % 60}`
    }
  }

  return(
    <div>
      <button onClick={() => setDisplay(!display)}>{marathon.Title} | {parseInt(marathon.Total_Length / 60)}:{calculateMinutes(marathon.Total_Length)} hours</button>
      {
        display ?
        <ul>
        {
          entries?.map(entry =>
            <li key={entry.ID}>{entry.Title} | {parseInt(entry.Length / 60)}:{calculateMinutes(entry.Length)} hours</li>  
          )
        }
        </ul> : null
      }
    </div>
  )
}

export default CommonMarathonEntry