import React from 'react'
import axios from 'axios'
import CommonMarathonEntry from './CommonMarathonEntry'
import styled from 'styled-components'

const Container = styled.div`
    height: 100%;
    width: 20%;
    border: 2px solid white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

function CommonMarathons() {

  const [ marathons, setMarathons ] = React.useState([])

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/common-marathons/length`
    })
    .then(res => {
      getCecilMarathon(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  function getCecilMarathon(commonMarathons) {
    axios({
      method: 'GET',
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/cecil-rank-marathon`
    })
    .then(res => {
      setMarathons([...commonMarathons, res.data.data])
    })
    .catch(err => {
      console.log(err)
    })
  }

  return(
    <Container>
      <p>Common Marathons:</p>
      {
        marathons?.map(marathon =>
          <CommonMarathonEntry key={marathon.ID ? marathon.ID : 'Cecil-Rank'} marathon={marathon}/> 
        )
      }
    </Container>
    
  )
}

export default CommonMarathons