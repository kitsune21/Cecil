import React, { Component } from 'react';
import axios from 'axios';

class RankingCategories extends Component {

  state={
    editID: 1
  }

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

  updateRankingCategories = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `http://localhost:3001/api/ranking_category/update/${this.state.editID}`,
      data: {
        Name: e.target.elements.categoryID.value
      }
    })
    .then(() => {
      console.log('success');
    })
    .catch(err => {
      console.log(err);
    })
  }

  displayEditInput = category => {
    return (
      <form onSubmit={this.updateRankingCategories}>
        <label>Name: <input id='categoryID' defaultValue={category.Name}/></label>
        <button type='submit'>Confirm</button>
      </form>
    )
  }

  render() {
    return(
        <ul> 
          {
            this.state.rankingCategories ?
            this.state.rankingCategories.map(category =>
            <li key={category.ID}>{this.state.editID !== category.ID ? category.Name : this.displayEditInput(category)}</li>
            ) : null
          }
        </ul>
    )
  }
}

export default RankingCategories;