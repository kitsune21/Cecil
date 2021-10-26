import React from 'react'
import axios from 'axios'

function AdminMarathon() {

  const [ showAddMarathon, setShowAddMarathon] = React.useState(false)
  const [ marathons, setMarathons ] = React.useState([])
  const [ selectedMarathon, setSelectedMarathon ] = React.useState(1)
  const [ success, setSuccess ] = React.useState()

  React.useEffect(() => {
    getMarathonTitles()
  }, [])

  function getMarathonTitles() {
    axios({
      method: 'GET',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/common-marathons'
    })
    .then(data => {
      setMarathons(data.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  function submitMarathon(e) {
    e.preventDefault()
    axios({
      method: 'POST',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/insert/marathon',
      data: {
        Title: e.target.elements.marathonTitle.value
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  function submitMarathonEntry(e) {
    e.preventDefault()
    axios({
      method: 'GET',
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/search/id/${e.target.elements.imdbID.value}/${selectedMarathon}/${e.target.elements.order.value}`
    })
    .then(data => {
      setSuccess(data.data.message)
    })
    .catch(err => {
      console.log(err)
    })
  }

  function handleChange(e) {
    setSelectedMarathon(e.target.value)
  }

  return(
    <div>
      {
        showAddMarathon ?
        <>
          <button onClick={() => setShowAddMarathon(false)}>Hide</button>
          <div>
            <form onSubmit={submitMarathon}>
              <label>Add Marathon: <input id='marathonTitle'/></label>
              <button>Submit</button>
            </form>
          </div>
          <div>
            <h5>Add to Marathon</h5>
            {
              success ? <p>{success}</p> : null
            }
            <form onSubmit={submitMarathonEntry}>
              <select onChange={handleChange}>
                {
                  marathons?.map(entry => 
                  <option key={entry.ID} value={entry.ID}>{entry.Title}</option>
                  )
                }
              </select>
              <label>IMDB ID: <input id='imdbID'/> Order: <input id='order'/></label>
              <button>Submit</button>
            </form>
            <br />
          </div>
        </>
        : <button onClick={() => setShowAddMarathon(true)}>Add Marathon</button>
      }
    </div>
  )
}

export default AdminMarathon