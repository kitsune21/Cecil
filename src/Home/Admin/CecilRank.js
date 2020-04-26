import React, { Component } from 'react';
import axios from 'axios';

class CecilRank extends Component {

  state = {};

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/movie_reviews/cecil",
    })
    .then( data => {
      this.setState({data: [...data.data.reviews, this.props.movieInfo]})
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

  render() {
    return(
      <div>
        <ul>
        {
          this.state.data ? 
          this.state.data.map(review =>
            <li key={review.ID ? review.ID : this.state.data.length}>{review.Title} | Cecil Rank: {review.Cecil_Rank ? review.Cecil_Rank : '???'}<select defaultValue={review.Cecil_Rank ? review.Cecil_Rank : this.state.data.length}>
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
      </div>
    )
  }
}

export default CecilRank;