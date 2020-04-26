import React, { Component } from 'react';
import axios from 'axios';

class CecilRank extends Component {

  state = {};

  componentDidMount() {
    console.log(this.props.movieInfo)
    axios({
      method: "GET",
      url: "http://localhost:3001/api/movie_reviews/cecil",
    })
    .then( data => {
      this.setState({data: [...data.data.reviews, this.props.movieInfo], newMovie: this.props.movieInfo, newMovieCecilRank: data.data.reviews.length + 1})
    })
    .catch( err => { console.log(err)});
  }

  showOptions = () => {
    return(
      <>
      {
        this.state.data.map(rank =>
          <option>{rank.Cecil_Rank}</option>
        )
      }
      </>
    )
  }

  addNewReview = () => {
    console.log(this.state.newMovie.Release)
    axios({
      method: 'POST',
      url: 'http://localhost:3001/api/movie_reviews/add',
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

  setNewMovieCecilRank = e => {
    this.setState({newMovieCecilRank: e.target.value})
  }

  render() {
    return(
      <div>
        <ul>
        {
          this.state.data ? 
          this.state.data.map(review =>
            <li key={review.ID ? review.ID : this.state.data.length}>{review.Title} | Cecil Rank: {review.Cecil_Rank ? review.Cecil_Rank : '???'}<select id={review.ID ? 'review' + review.ID : 'newMovieCecilRank'} onChange={this.setNewMovieCecilRank} defaultValue={review.Cecil_Rank ? review.Cecil_Rank : this.state.data.length}>
            {
              this.state.data ?
              this.state.data.map(rank =>
                <option key={rank.ID ? rank.ID : this.state.data.length}>{rank.Cecil_Rank ? rank.Cecil_Rank : this.state.data.length}</option>
              )
              : null
            }
            </select></li>
          )
          : <p>Loading...</p>
        }
        </ul>
        <button onClick={this.addNewReview}>Create New Review</button>
      </div>
    )
  }
}

export default CecilRank;