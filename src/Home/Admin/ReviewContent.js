import React, { Component } from 'react';
import axios from 'axios';
import ReviewContentItem from './ReviewContentItem';

class ReviewContent extends Component{

  state = {
    activeReviewID: 0,
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/movie_reviews/cecil"
    })
    .then( reviews => {
      this.setState({movieReviews: [...reviews.data.reviews]});
    })
    .catch( err => {
      console.log(err)
    });
  }

  buttonActiveReviewToggle = e => {
    this.setState({activeReviewID: e.target.id})
  }

  render() {
    return(
      <>
      <ul>
      {
        this.state.movieReviews ?
        this.state.movieReviews.map(review =>
          <div key={review.ID}>
            <p>{review.Title}</p>
            <button id={review.ID} onClick={this.buttonActiveReviewToggle}>Show</button>
            <br />
            <ReviewContentItem reviewID={review.ID} activeReviewID={this.state.activeReviewID}/>
            <br />
          </div>
        ) : null
      }
      </ul>
      </>
    )
  }
}

export default ReviewContent;