import React, { Component } from 'react'; 
import axios from 'axios';
import CecilRank from './CecilRank';

class AdminMovieReview extends Component {

  state = {
    movieSelected: false,
    updateCecilRanks: false
  }

  pullData = (e) => {
    e.preventDefault();
    let movieTitle = e.target.elements.movieTitle.value;
    movieTitle = movieTitle.replace(/\s/g, '+');
    axios({
      method: 'GET',
      url: 'http://localhost:3001/api/movies/getOMDB/',
    })
    .then(data => {
      axios({
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${data.data.apiKey}&t=${movieTitle}`
      })
      .then(data => {
        this.setState({movieInfo: data.data})
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  selectMovieButton = () => {
    this.setState({movieSelected: true});
  }

  toggleUpdateShow = () => {
    this.setState({updateCecilRanks: !this.state.updateCecilRanks})
  }

  render() {
    return(
      <>
        <div>
          <button onClick={this.toggleUpdateShow}>Update Ranks</button>
          {
            this.state.updateCecilRanks ?
            <>
              <h3>Update Cecil Rank</h3>
              <CecilRank/>  
            </> : null
          }
        </div>
        <form onSubmit={this.pullData}>
          <label>Movie Name: <input id='movieTitle'/></label>
          <button type='submit'>Search</button>
        </form>
        {
          this.state.movieInfo && !this.state.movieSelected ?
          <div>
            <br />
            <h3>This Movie?</h3>
            <button onClick={this.selectMovieButton}>Select</button>
            <ul>
              <li>Title: {this.state.movieInfo.Title}</li>
              <li>Director: {this.state.movieInfo.Director}</li>
              <li>Genre: {this.state.movieInfo.Genre}</li>
              <li>Rated: {this.state.movieInfo.Rated}</li>
              <li>Release: {this.state.movieInfo.Released}</li>
              <li>Writer: {this.state.movieInfo.Writer}</li>
              <li>Plot: {this.state.movieInfo.Plot}</li>
              <li>imdb ID: {this.state.movieInfo.imdbID}</li>
              <li><img src={this.state.movieInfo.Poster} alt={`The poster for ${this.state.movieInfo.Title}`}/></li>
            </ul>
          </div>
          : null
        }
        {
          this.state.movieSelected ?
          <CecilRank movieInfo={this.state.movieInfo} />
          : null
        }
      </>
    )
  }
}

export default AdminMovieReview;