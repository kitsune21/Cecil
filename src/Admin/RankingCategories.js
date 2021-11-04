import React, { Component } from 'react';
import axios from 'axios';

class RankingCategories extends Component {

  state={
    editID: 0
  }

  componentDidMount() {
    this.pullRankingCategories();
  }

  pullRankingCategories = () => {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/ranking_category"
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
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/ranking_category/update/${this.state.editID}`,
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

  addRankingCategory = e => {
    e.preventDefault();
    e.preventDefault();
    axios({
      method: "POST",
      url: `https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/ranking_category/add/`,
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
    if(category.ID === this.state.editID){
      return (
        <form onSubmit={this.updateRankingCategories}>
          <label>Name: <input id='categoryID' defaultValue={category.Name}/></label>
          <button type='submit'>Confirm</button>
        </form>
      )
    } else {
      return (
        category.Name
      )
    }
  }

  toggleEdit = e => {
    const id = parseInt(e.target.id);
    if(id === this.state.editID){
      this.setState({editID: 0});
    } else {
      this.setState({editID: id});
    }
  }

  render() {
    return(
        <ul> 
          {
            this.state.rankingCategories ?
            this.state.rankingCategories.map(category =>
            <li key={category.ID}>{this.displayEditInput(category)}  <button id={category.ID} onClick={this.toggleEdit}>{category.ID === this.state.editID ? 'Close' : 'Edit'}</button></li>
            ) : null
          }
          <li>Add New Category: <form onSubmit={this.addRankingCategory}><input id='categoryID' />  <button type='submit'>Confirm</button></form></li>
        </ul>
    )
  }
}

export default RankingCategories;