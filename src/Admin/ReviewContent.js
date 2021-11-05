import React from 'react';
import axios from 'axios';
import ReviewContentItem from './ReviewContentItem';

function ReviewContent() {

  const [ myReviewID, setMyReviewID ] = React.useState()
  const [ movieReviews, setMovieReviews ] = React.useState()

  React.useEffect(() => {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/movie_reviews/cecil"
    })
    .then( reviews => {
      setMovieReviews([...reviews.data.reviews])
    })
    .catch( err => {
      console.log(err)
    });
  }, [])

  function buttonActiveReviewToggle(e) {
    setMyReviewID(e.target.id)
  }

  return(
    <ul>
    {
      movieReviews ?
      movieReviews.map(review =>
        <div key={review.ID}>
          <p>{review.Title}</p>
          <button id={review.ID} onClick={buttonActiveReviewToggle}>Show</button>
          <br />
          <ReviewContentItem reviewID={review.ID} activeReviewID={myReviewID}/>
          <br />
        </div>
      ) : null
    }
    </ul>
  )
}

export default ReviewContent;