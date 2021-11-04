import React from 'react'
import axios from 'axios'
import MovieRankingUpdate from './MovieRankingUpdate'

function MovieRanking() {

  const [ myReviewID, setMyReviewID ] = React.useState()
  const [ movieReviews, setMovieReviews ] = React.useState([])
  const [ rankingCategories, setRankingCategories ] = React.useState([])

  React.useEffect(() => {
    pullMovieReviews()
    pullRankingCategories()
  }, [])

  function pullMovieReviews() {
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
  }

  function pullRankingCategories() {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/ranking_category"
    })
    .then( categories => {
      setRankingCategories([...categories.data.data])
    })
    .catch( err => {
      console.log(err)
    });
  }

  function handleReviewID(e) {
    setMyReviewID(e.target.id)
  }

  return(
    <>
      {
        movieReviews ? 
        movieReviews.map(review => 
          <div key={review.ID}>
            <button id={review.ID} onClick={handleReviewID}>{review.Title}</button>
            <MovieRankingUpdate myReviewID={review.ID} activeReviewID={myReviewID} rankingCategories={rankingCategories}/>
          </div>
        ) : <p>Loading...</p>
      }
    </>
  )
}

export default MovieRanking;