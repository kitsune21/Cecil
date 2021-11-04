import React from 'react'
import axios from 'axios'

//rebuild the whole thing

function CecilRank({movieInfo}) {

  const [ addRanking, setAddRanking ] = React.useState(false)
  const [ myReviews, setMyReviews ] = React.useState([])

  React.useEffect(() => {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/movie_reviews/cecil",
    })
    .then( data => {
      if(movieInfo) {
        setMyReviews([...data.data.reviews, movieInfo], {newMovie: movieInfo, newMovieCecilRank: data.data.reviews.length + 1})
      } else {
        setMyReviews([...data.data.reviews])
      }
    })
    .catch( err => { console.log(err)});
  }, [movieInfo])

  function submitAddandUpdate() {
    if(movieInfo) {
      addNewReview();
      setAddRanking(true)
    }
    myReviews.forEach(review => {
      if(review.ID && review.updatedCecil) {
        putCecilRank(review.ID, review.Cecil_Rank);
        let myReviewsUpdated = myReviews.map(review2 => {
          if(review2.ID === review.ID){
            return {...review2, updatedCecil: false}
          } else {
            return review2
          }
        });
        setMyReviews(myReviewsUpdated)
      }
    });
  }

  function addNewReview() {
    axios({
      method: 'POST',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/movie_reviews/add',
      data: {
        Title: this.state.newMovie.Title,
        Cecil_Rank: this.state.newMovieCecilRank,
        Director: this.state.newMovie.Director,
        Genre: this.state.newMovie.Genre,
        Rated: this.state.newMovie.Rated,
        Release: this.state.newMovie.Released,
        Writer: this.state.newMovie.Writer,
        Plot: this.state.newMovie.Plot,
        Imdb_ID: this.state.newMovie.imdbID,
        Poster_URL: this.state.newMovie.Poster
      }
    })
  }

  function setNewMovieCecilRank(e) {
    if(movieInfo) {
      this.setState({newMovieCecilRank: e.target.value})
    } else {
      let id = parseInt(e.target.id);
      let value = e.target.value;
      this.setState(state => {
        const data = state.data.map(review => {
          if(review.ID === id){
            return {...review, Cecil_Rank: value, updatedCecil: true}
          } else {
            return review
          }
        });
        return { data };
      });
    }
  }

  function putCecilRank(id, cRank) {
    axios({
      method: 'PUT',
      url: 'https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/movie_reviews/update/' + id,
      data: {
        Cecil_Rank: cRank
      }
    })
  }

  return(
    <div>
      {
        myReviews && !addRanking ?
        <>
        <ul>
        { 
          myReviews.map(review =>
            <li key={review.ID ? review.ID : myReviews.length + 5}>{review.Title} | Cecil Rank: {review.Cecil_Rank ? review.Cecil_Rank : '???'}<input id={review.ID ? review.ID : 'newMovieCecilRank'} type='number' onChange={setNewMovieCecilRank} defaultValue={review.Cecil_Rank ? review.Cecil_Rank : myReviews.length} /></li>
          )
        }
        </ul>
        <button onClick={submitAddandUpdate}>{movieInfo ? 'Create Movie Review' : 'Update Cecil Rank'}</button>
        </>
        : null
      }
    </div>
  )
}

export default CecilRank;