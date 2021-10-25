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
    <Container>
      <p>Common Marathons:</p>
    {
      marathons?.map(marathon =>
        <CommonMarathonEntry key={marathon.ID} marathon={marathon}/> 
      )
    }
    </Container>
    
  )
}

export default CommonMarathons