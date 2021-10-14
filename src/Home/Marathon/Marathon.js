import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import CommonMarathons from './CommonMarathons'
import MarathonLength from './MarathonLength'

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
  margin: 1px;
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

function Marathon() {

  const [ marathonList, setMarathonList ] = React.useState([])
  const [ searchList, setSearchList ] = React.useState([])
  const [ marathonLength, setMarathonLength ] = React.useState(0)
  const [ movieLengthList, setMovieLengthList ] = React.useState([])

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
      let movieEntry = {
        id: movieID,
        length: parseInt(data.data.data)
      }
      setMovieLengthList([...movieLengthList, movieEntry])
      setMarathonLength(marathonLength + parseInt(data.data.data))
    })
    .catch( err => { console.log(err)});
  }

  function addSelectionToList(e, data) {
    e.preventDefault()
    setMarathonList([...marathonList, data])
    addMinutes(data.imdbID)
    removeSelectionFromSearch(data.imdbID)
  }

  function clearMarathonList() {
    setSearchList([...searchList, ...marathonList])
    setMarathonList([])
    setMarathonLength(0)
  }

  function removeSelection(selection) {
    if(marathonList.length === 1) {
      setMarathonList([])
      setMarathonLength(0)
      setMovieLengthList([])
      setSearchList([...searchList, selection])
    } else {
      let updatedList = []
      marathonList.forEach(movie => {
        if(movie.imdbID !== selection.imdbID) {
          updatedList.push(movie)
          let updatedEntryList = []
          movieLengthList.forEach(entry => {
            if(entry.id !== selection.imdbID) {
              updatedEntryList.push(entry)
            }
          })
          updateMarathonLength(updatedEntryList)
        } else {
          setSearchList([...searchList, movie])
        }
      })
      setMarathonList(updatedList)
    }
  }

  function removeSelectionFromSearch(id) {
    let updatedList = []
    searchList.forEach(entry => {
      if(entry.imdbID !== id) {
        updatedList.push(entry)
      }
    })
    setSearchList(updatedList)
  }

  function updateMarathonLength(entryList) {
    let total = 0
    entryList.map(movie => {
      total += movie.length
    })
    setMarathonLength(total)
    setMovieLengthList(entryList)
  }

  return(
    <Container>
      <CommonMarathons />
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
          {
            movieLengthList ?
            <MarathonLength marathonLength={marathonLength}/>

            : null
          }
          <MarathonRow>
          {
            marathonList?.map(movie =>
              <img key={movie.imdbID} alt={movie.Plot} src={movie.Poster} width='8%' onClick={() => removeSelection(movie)}/>
              )
            }
          </MarathonRow>
          <SearchButton onClick={clearMarathonList} style={{marginLeft: '48.5%'}}>Clear</SearchButton>
        </MarathonContainer>
        : null
      }
    </Container>
  )
}

export default Marathon
