import React from 'react'
import { getCommonMarathonsWithCecilMarathon } from '../../API/api'
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
    getCommonMarathonsWithCecilMarathon(setMarathons)
  }, [])

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