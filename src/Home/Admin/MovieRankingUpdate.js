import React, { Component } from 'react';
import axios from 'axios';

class MovieRankingUpdate extends Component {

  state = {};

  componentDidMount() {
    this.pullRankingsForReview();
  }

  pullRankingsForReview = () => {
    axios({
      method: "GET",
      url: `http://localhost:3001/api/rankings/${this.props.myReviewID}`
    })
    .then( rankings => {
      this.setState({myRankings: [...rankings.data.rankings]});
    })
    .catch( err => {
      console.log(err)
    });
  }

  render() {
    return(
      <>
      <ul>
      {
        parseInt(this.props.myReviewID) === parseInt(this.props.activeReviewID) ? 
          this.state.myRankings.length > 0 ?
          this.state.myRankings.map(ranking => 
            <li key={ranking.ID}>{ranking.Name} <input type='number' defaultValue={ranking.Value}/></li>  
          ) :
          this.props.rankingCategories.map(ranking =>
            <li key={ranking.ID}>{ranking.Name} <input type='number' defaultValue='0'/></li>
          ) : null
      }
      </ul>
      </>
    )
  }
}

export default MovieRankingUpdate;