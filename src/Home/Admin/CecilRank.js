import React, { Component } from 'react';
import axios from 'axios';
import MovieRanking from './MovieRanking';

class CecilRank extends Component {

  state = {
    addRanking: false
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/movie_reviews/cecil",
    })
    .then( data => {
      if(this.props.movieInfo) {
        this.setState({data: [...data.data.reviews, this.props.movieInfo], newMovie: this.props.movieInfo, newMovieCecilRank: data.data.reviews.length + 1})
      } else {
        this.setState({data: [...data.data.reviews]})
      }
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

  submitAddandUpdate = () => {
    if(this.props.movieInfo) {
      this.addNewReview();
      this.setState({addRanking: true})
    }
    this.state.data.forEach(review => {
      if(review.ID && review.updatedCecil) {
        this.putCecilRank(review.ID, review.Cecil_Rank);
        this.setState(state => {
          const data = state.data.map(review2 => {
            if(review2.ID === review.ID){
              return {...review2, updatedCecil: false}
            } else {
              return review2
            }
          });
          return { data };
        });
      }
    });
  }

  addNewReview = () => {
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
    if(this.props.movieInfo) {
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

  putCecilRank = (id, cRank) => {
    axios({
      method: 'PUT',
      url: 'http://localhost:3001/api/movie_reviews/update/' + id,
      data: {
        Cecil_Rank: cRank
      }
    })
  }

  render() {
    return(
      <div>
        {
          this.state.data && !this.state.addRanking ?
          <>
          <ul>
          { 
            this.state.data.map(review =>
              <li key={review.ID ? review.ID : this.state.data.length + 5}>{review.Title} | Cecil Rank: {review.Cecil_Rank ? review.Cecil_Rank : '???'}<input id={review.ID ? review.ID : 'newMovieCecilRank'} type='number' onChange={this.setNewMovieCecilRank} defaultValue={review.Cecil_Rank ? review.Cecil_Rank : this.state.data.length} /></li>
            )
          }
          </ul>
          <button onClick={this.submitAddandUpdate}>{this.props.movieInfo ? 'Create Movie Review' : 'Update Cecil Rank'}</button>
          </>
          : null
        }
        {
          this.state.addRanking ? 
          <MovieRanking /> : null 
        }
      </div>
    )
  }
}

export default CecilRank;