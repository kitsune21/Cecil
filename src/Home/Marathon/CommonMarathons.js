import React from 'react'
import axios from 'axios'
import CommonMarathonEntry from './CommonMarathonEntry'
import styled from 'styled-components'

const Container = styled.div`
    height: 40%;
    width: 100%;
    border: 2px solid white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

function CommonMarathons() {

  const [ marathons, setMarathons ] = React.useState([])
  const [ display, setDisplay ] = React.useState(false)

  React.useEffect(() => {
    getCommonMarathons()
  }, [])

  function getCommonMarathons() {
    axios({
      method: 'GET',
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/common-marathons/length`
    })
    .then(res => {
      setMarathons(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return(
    <div>
      <h4 onClick={() => setDisplay(!display)}>View Common Marathons</h4>
      {
        display ?
        <Container>
        {
          marathons?.map(marathon =>
            <CommonMarathonEntry key={marathon.ID} marathon={marathon}/> 
          )
        }
        </Container>
        : null
      }
    </div>
    
  )
}

export default CommonMarathons