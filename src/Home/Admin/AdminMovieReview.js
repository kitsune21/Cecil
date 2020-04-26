import React, { Component } from 'react';
import axios from 'axios';

class AdminMovieReview extends Component {

  state = {}

  pullData = (e) => {
    e.preventDefault();
    let movieTitle = e.target.elements.movieTitle.value;
    movieTitle = movieTitle.replace(/\s/g, '+');
    console.log(movieTitle)
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
        console.log(data.data)
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

  render() {
    return(
      <>
        <form onSubmit={this.pullData}>
          <label>Movie Name: <input id='movieTitle'/></label>
          <button type='submit'>Search</button>
        </form>
        {
          this.state.movieInfo ?
          <div>
            <br />
            <h3>This Movie?</h3>
            <ul>
              <li>Title: {this.state.movieInfo.Title}</li>
              <li>Director: {this.state.movieInfo.Director}</li>
              <li>Genre: {this.state.movieInfo.Genre}</li>
              <li>Rated: {this.state.movieInfo.Rated}</li>
              <li>Released: {this.state.movieInfo.Released}</li>
              <li>Writer: {this.state.movieInfo.Writer}</li>
              <li>Plot: {this.state.movieInfo.Plot}</li>
              <li>imdb ID: {this.state.movieInfo.imdbID}</li>
              <li><img src={this.state.movieInfo.Poster} alt={`The poster for ${this.state.movieInfo.Title}`}/></li>
            </ul>
          </div>
          : null
        }
      </>
    )
  }
}

export default AdminMovieReview;