import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-conent: space-around;
  text-align: center;
`

const SearchButton = styled.button`
  width: 60px;
  padding: 5px;
  border-radius: unset;
  border: 2px solid #ccc;
  &:hover {
    border: 2px solid #000;
  }
`

const SearchImage = styled.button`
  width: 10%;
  margin: 2px;
`

const MarathonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-conent: space-around;
  text-align: center;
`

const MarathonRow = styled.div`
  flex-direction: row;
  align-content: center;
  justify-conent: space-around;
`

const MarathonImage = styled.div`
  width: 8%;
`

function Marathon() {

  const [ marathonList, setMarathonList ] = React.useState([])
  const [ searchList, setSearchList ] = React.useState([])
  const [ marathonLength, setMarathonLength ] = React.useState(0)

  function movieSearch(e) {
    e.preventDefault()
    setSearchList([])
    let movieTitle = e.target.elements.movieTitle.value;
    movieTitle = movieTitle.replace(/\s/g, '+');
    e.preventDefault()
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/search/" + movieTitle,
    })
    .then( data => {
      console.log(data.data.data)
      setSearchList([...data.data.data.Search])
    })
    .catch( err => { console.log(err)});
  }

  function addMinutes(movieID) {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/marathon/search/runtime/" + movieID,
    })
    .then( data => {
      setMarathonLength(marathonLength + parseInt(data.data.data))
    })
    .catch( err => { console.log(err)});
    
  }

  function addSelectionToList(e, data) {
    e.preventDefault()
    setMarathonList([...marathonList, data])
    addMinutes(data.imdbID)
  }

  function clearMarathonList() {
    setMarathonList([])
    setMarathonLength(0)
  }

  return(
    <Container>
      <p>Search for a movie title, and then select it as part of your movie marathon.</p>
      <div>
        <form onSubmit={movieSearch}>
          <label htmlFor='movieTitle'>Movie Title: 
            <input id='movieTitle'/>
            <SearchButton type='submit' style={{borderRadius: '10px'}}>Search</SearchButton>
          </label>
        </form>
        {
          searchList?.map(result =>
            result.Poster !== 'N/A' ?
            <SearchImage key={result.imdbID} onClick={(e) => addSelectionToList(e, result)}><img alt={result.Plot} src={result.Poster} width='100%'/></SearchImage>
            : null
          )
        }
      </div>
      {
        marathonList.length > 0 ? 
        <MarathonContainer>
          <h2>Your Marathon:</h2>
          <MarathonRow>
          {
            marathonList?.map(movie =>
              <img key={movie.imdbID} alt={movie.Plot} src={movie.Poster} width='8%'/>
            )
          }
          </MarathonRow>
          <SearchButton onClick={clearMarathonList}>Clear</SearchButton>
          <div>
            Marathon is {marathonLength} minutes long, {parseFloat(marathonLength / 60).toFixed(2)} hours long.
          </div>
        </MarathonContainer>
        : null
      }
    </Container>
  )
}

export default Marathon
