import React, { Component } from 'react';
import axios from 'axios';

class RankingCategories extends Component {

  state={}

  componentDidMount() {
    this.pullRankingCategories();
  }

  pullRankingCategories = () => {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/ranking_category"
    })
    .then( categories => {
      this.setState({rankingCategories: [...categories.data.data]});
    })
    .catch( err => {
      console.log(err)
    });
  }

  updateRankingCategories = (category) => {
    axios({
      method: "PUT",
      url: `http://localhost:3001/api/ranking_category/update/${category.ID}`,
      body: {
        Name: 
      }
    })
    .then(() => {
      console.log('success');
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
        <ul> 
          {
            this.state.rankingCategories ?
            this.state.rankingCategories.map(category =>
              <li key={category.ID}>{category.Name}</li>
            ) : null
          }
        </ul>
    )
  }
}

export default RankingCategories;