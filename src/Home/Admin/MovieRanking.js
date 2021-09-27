import React, { Component } from 'react';
import axios from 'axios';
import MovieRankingUpdate from './MovieRankingUpdate';

class MovieRanking extends Component {

  state =  {
    myReviewID: ''
  }

  componentDidMount() {
    this.pullMovieReviews();
    this.pullRankingCategories();
  }

  pullMovieReviews = () => {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/movie_reviews/cecil"
    })
    .then( reviews => {
      this.setState({movieReviews: [...reviews.data.reviews]});
    })
    .catch( err => {
      console.log(err)
    });
  }

  pullRankingCategories = () => {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/ranking_category"
    })
    .then( categories => {
      this.setState({rankingCategories: [...categories.data.data]});
    })
    .catch( err => {
      console.log(err)
    });
  }

  setReviewID = e => {
    this.setState({activeReviewID: e.target.id})
  }

  render() {
    return(
      <>
        {
          this.state.movieReviews ? 
          this.state.movieReviews.map(review => 
            <div key={review.ID}>
              <button id={review.ID} onClick={this.setReviewID}>{review.Title}</button>
              <MovieRankingUpdate myReviewID={review.ID} activeReviewID={this.state.activeReviewID} rankingCategories={this.state.rankingCategories}/>
            </div>
          ) : <p>Loading...</p>
        }
      </>
    )
  }
}

export default MovieRanking;