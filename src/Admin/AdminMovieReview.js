import React, { Component } from 'react'; 
import axios from 'axios';
import CecilRank from './CecilRank';
import MovieRanking from './MovieRanking';
import ReviewContent from './ReviewContent';
import RankingCategories from './RankingCategories';
import AdminMarathon from './AdminMarathon';

class AdminMovieReview extends Component {

  state = {
    movieSelected: false,
    updateCecilRanks: false,
    toggleMovie: false,
    toggleReviewContent: false,
    toggleRankingCategories: false,
  }

  pullData = (e) => {
    e.preventDefault();
    let movieTitle = e.target.elements.movieTitle.value;
    movieTitle = movieTitle.replace(/\s/g, '+');
    axios({
      method: 'GET',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/movies/getOMDB/',
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

  toggleShowMovieRanking = () => {
    this.setState({toggleMovie: !this.state.toggleMovie})
  }

  toggleReviewContent = () => {
    this.setState({toggleReviewContent: !this.state.toggleReviewContent})
  }

  toggleRankingCategoriesView = () => {
    this.setState({toggleRankingCategories: !this.state.toggleRankingCategories})
  }

  render() {
    return(
      <>
        <AdminMarathon />
        <div>
          <button onClick={this.toggleRankingCategoriesView}>Edit Ranking Categories</button>
          {
            this.state.toggleRankingCategories ?
            <>
              <RankingCategories/>
            </> : null
          }
        </div>
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
        <div>
          <button onClick={this.toggleShowMovieRanking}>Update Ranking</button>
          {
            this.state.toggleMovie ?
            <>
              <h3>Add Ranking</h3>
              <MovieRanking />
            </> : null
          }
        </div>
        <div>
          <button onClick={this.toggleReviewContent}>Update Review Content</button>
          {
            this.state.toggleReviewContent ?
            <>
              <h3>Update Review Content</h3>
              <ReviewContent />
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