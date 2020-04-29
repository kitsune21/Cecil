import React, { Component } from 'react';
import axios from 'axios';

class MovieRanking extends Component {

  state =  {}

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/ranking_category"
    })
    .then( categories => {
      console.log(categories)
      this.setState({rankingCategories: [...categories.data.data]});
    })
    .catch( err => {
      console.log(err)
    });
  }

  render() {
    return(
      <>
        {
          this.state.rankingCategories ? 
          this.state.rankingCategories.map(category => 
            <p key={category.ID}>{category.Name}</p>  
          ) : <p>Loading...</p>
        }
      </>
    )
  }
}

export default MovieRanking;