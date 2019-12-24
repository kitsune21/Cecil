import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

//{id: 'tt0482571', title: 'The Prestige', cecilRank: 2, rankings: [{name: 'Cinematography', value: 8}, {name: 'Pacing', value: 7}, {name: 'Music/Sound', value: 7}, {name: 'Re-Watchability', value: 8}, {name: 'Recommendation', value: 8}], content: [{spoiler: true, p: 'Spoiler'}, {spoiler: false, p: 'Spoiler Free'}], data: null},
const data = [ 
  {id: 'tt2584384', title: 'JoJo Rabbit', cecilRank: 1, content: [{spoiler: true, p: 'Spoiler'}, {spoiler: false, p: 'Spoiler Free'}], data: null},
  {id: 'tt0482571', title: 'The Prestige', cecilRank: 2, content: [{spoiler: true, p: 'Spoiler'}, {spoiler: false, p: 'Spoiler Free'}], data: null},
  {id: 'tt4729430', title: 'Klaus', cecilRank: 3, content: [{spoiler: true, p: 'Spoiler'}, {spoiler: false, p: 'Spoiler Free'}], data: null},
];

const rankingData = [
  {movieID: 'tt2584384', name: 'Cinematography', value: 7}, {movieID: 'tt2584384', name: 'Pacing', value: 8}, {movieID: 'tt2584384', name: 'Music/Sound', value: 7}, {movieID: 'tt2584384', name: 'Re-Watchability', value: 8}, {movieID: 'tt2584384', name: 'Recommendation', value: 8},
  {movieID: 'tt0482571', name: 'Cinematography', value: 8}, {movieID: 'tt0482571', name: 'Pacing', value: 7}, {movieID: 'tt0482571', name: 'Music/Sound', value: 5}, {movieID: 'tt0482571', name: 'Re-Watchability', value: 8}, {movieID: 'tt0482571', name: 'Recommendation', value: 8},
  {movieID: 'tt4729430', name: 'Cinematography', value: 7}, {movieID: 'tt4729430', name: 'Pacing', value: 8}, {movieID: 'tt4729430', name: 'Music/Sound', value: 6}, {movieID: 'tt4729430', name: 'Re-Watchability', value: 6}, {movieID: 'tt4729430', name: 'Recommendation', value: 8}
]

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const omdbAPI = `http://www.omdbapi.com/?apikey=${API_KEY}&`

class MovieReview extends Component {

  state={
    filterByRanking: 'Cecil Rank',
    spoilerFree: true,
    data,
    rankingData
  }

  componentDidMount() {
    //this.state.data.forEach(review => this.returnDataFromOMBD(review.id))
  }

  filterReviews = () => {
    if(this.state.filterByRanking === 'Cecil Rank'){
      return this.state.data.sort((a, b) => (a.cecilRank > b.cecilRank) ? 1 : -1)
    } else {
      let returnMovieList = [];
      let listOfRanks = [];
      listOfRanks = this.state.rankingData.map(rank => {
        if(rank.name === this.state.filterByRanking){
          return rank;
        } else {
          return null;
        }
      }) 
      listOfRanks = listOfRanks.filter(rank => {return rank != null})
      listOfRanks.sort((a, b) => (a.value < b.value) ? 1 : (a.value === b.value) ? ((this.returnCecilRank(a.movieID) > this.returnCecilRank(b.movieID)) ? 1 : -1) : -1 );
      listOfRanks.forEach(rank => {
        returnMovieList.push(this.state.data.filter(review => {return review.id === rank.movieID})[0])
      })
      return returnMovieList;
    }
  }

  returnCecilRank = (id) => {
    return this.state.data.filter(review => {return review.id === id})[0].cecilRank
  }

  returnDataFromOMBD = (id) => {
    axios({
      method: 'GET',
      url: omdbAPI + 'i=' + id
    })
    .then(omdbData => this.setState(prevState => ({
      data: prevState.data.map(
        entry => entry.id === omdbData.data.imdbID ? {...entry, data: omdbData} : entry
      )
    })))
    .catch(data => console.log(data))
  }

  renderOMDBInfo = (data) => {
    return(
      <div>
        <p>Director: {data.Director}</p>
        <p>Genre: {data.Genre}</p> 
        <p>Rated: {data.Rated}</p>
        <p>Released: {data.Released}</p>
        <p>Written By: {data.Writer}</p>
        <p>Plot: {data.Plot}</p>
        <img src={data.Poster} alt={`Poster of ${data.Title}`}/>
      </div>
    )
  }

  handleSpoilerChange = () => {
    this.setState({spoilerFree: !this.state.spoilerFree})
  }  

  returnSpoilerStyle = () => {
    if(!this.state.spoilerFree){
      return null
    } else {
      return {color: 'white'}
    }
  }

  returnRankObject = (rank) => {
    console.log(rank)
    if(rank.name === 'Cinematography'){
      return rank.value
    }
  }
   
  renderFilterByDropDown = () => {
    return(
      <select onChange={this.handleFilterChange}>
        <option>Cecil Rank</option>
        <option>Cinematography</option>
        <option>Pacing</option>
        <option>Music/Sound</option>
        <option>Re-Watchability</option>
        <option>Recommendation</option>
      </select>
    )
  }

  handleFilterChange = (e) => {
    this.setState({filterByRanking: e.target.value})
  }

  render() {
    return(
      <div>
        <h2>Movie Reviews by Cecil:</h2>
        <p>Filter by: </p>
        {this.renderFilterByDropDown()}
        <p>Ties are won by the "Cecil Rank"</p>
        {
          this.filterReviews().map(entry => 
            <div key={entry.id}>
              <h4>{entry.title}:</h4>
              <h5>The Cecil Rank: #{entry.cecilRank}</h5>
              {
                this.state.rankingData.map((rank, i) =>
                rank.movieID === entry.id ? 
                <div key={i}>
                  <h5>{rank.name}: ({rank.value}/8)</h5>
                  <StarRatings 
                    rating={rank.value}
                    starRatedColor='orange'
                    numberOfStars={8}
                    name={rank.name}
                  />
                </div> : null
                )
              }
              <h5>Review:</h5>
              <p>Spoiler Free? <input checked={this.state.spoilerFree} onChange={this.handleSpoilerChange} type='checkbox'></input></p>
              {
                entry.content.map((paragraph, i) => 
                  paragraph.spoiler ? <p style={this.returnSpoilerStyle()} key={i}>{paragraph.p}</p> : <p key={i}>{paragraph.p}</p>
                )
              }
              <h5>Movie Info:</h5>
              <div>
                {
                  entry.data ? this.renderOMDBInfo(entry.data.data) : null
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default MovieReview;