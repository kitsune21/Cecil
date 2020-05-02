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
      if(rankings.data.rankings.length > 0){
        this.setState({myRankings: [...rankings.data.rankings]});
      } else {
        this.setState({newRankings: [...this.props.rankingCategories]});
      }
    })
    .catch( err => {
      console.log(err)
    });
  }

  updateRankingValue = e => {
    let id = e.target.id;
    let value = e.target.value;
    this.setState(state => {
      const myRankings = state.myRankings.map(ranking => {
        if(parseInt(ranking.ID) === parseInt(id)){
          return {...ranking, Value: value}
        } else {
          return ranking
        }
      });
      return { myRankings };
    });
  }

  putRanking = () => {
    this.state.myRankings.forEach(ranking => {
      axios({
        method: 'PUT',
        url: `http://localhost:3001/api/rankings/update/${ranking.ID}`,
        data: {
          Value: ranking.Value
        }
      })
    })
  }

  addRankingsToState = e => {
    let value = e.target.value;
    let id = e.target.id;
    this.setState(state => {
      const newRankings = state.newRankings.map(ranking => {
        if(parseInt(ranking.ID) === parseInt(id)){
          return {...ranking, Value: value}
        } else {
          return ranking
        }
      });
      return { newRankings };
    });
  }

  addRankings = () => {
    this.state.newRankings.forEach(category => {
      axios({
        method: 'POST',
        url: `http://localhost:3001/api/rankings/add`,
        data: {
          Review_ID: this.props.myReviewID,
          Category_ID: category.ID,
          Value: category.Value
        }
      })
    })
  }

  render() {
    return(
      <>
        <ul>
        {
          parseInt(this.props.myReviewID) === parseInt(this.props.activeReviewID) ? 
          !this.state.newRankings ?
            <> {
              this.state.myRankings.map(ranking => 
                <li key={ranking.ID}>{ranking.Name} <input type='number' id={ranking.ID} onChange={this.updateRankingValue} value={ranking.Value} min="1" max="8"/></li>  
              )
            }
            <button type='submit' onClick={this.putRanking}>Submit</button></>
            :
            <>
            {
              this.state.newRankings.map(ranking =>
                <li key={ranking.ID}>{ranking.Name} <input type='number' id={ranking.ID} value={ranking.Value} onChange={this.addRankingsToState} min="1" max="8"/></li>
              )
            }
            <button type='submit' onClick={this.addRankings}>Add</button>
            </>: null
        }
        </ul>
      </>
    )
  }
}

export default MovieRankingUpdate;