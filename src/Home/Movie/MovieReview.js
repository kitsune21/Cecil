import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

class MovieReview extends Component {

  state={
    filterByRanking: 'Cecil Rank',
    spoilerFree: true,
    toggleLeast: false,
    rankingCategories: []
  }

  componentDidMount() {
    this.getMovieReviews();
    this.getRankingCategories();
  }

  getMovieReviews = () => {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/movie_reviews",
    })
    .then( data => {
      this.setState({data: data.data.reviews})
    })
    .catch( err => { console.log(err)});
  }

  getRankingCategories = () => {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/ranking_category"
    })
    .then( data => {
      let rankingCategories = data.data.data.map(category => {
        return category;
      })
      this.setState({rankingCategories});
    })
    .catch( err => {
      console.log(err)
    });
  }

  filterReviews = () => {
    if(this.state.filterByRanking === 'Cecil Rank'){
      if(this.state.toggleLeast){
        return this.state.data.sort((a, b) => (a.Cecil_Rank > b.Cecil_Rank) ? 1 : -1).reverse()
      } else {
        return this.state.data.sort((a, b) => (a.Cecil_Rank > b.Cecil_Rank) ? 1 : -1);
      }
    } else {
      let returnMovieList = [];
      let listOfRanks = [];
      this.state.data.forEach(review => {
        review.rankings.forEach(rank => {
          if(rank.Category_Name === this.state.filterByRanking){
            listOfRanks.push(rank);
          }
        })
      })
      listOfRanks.sort((a, b) => (a.Value < b.Value) ? 1 : (a.Value === b.Value) ? ((this.returnCecilRank(a.Review_ID) > this.returnCecilRank(b.Review_ID)) ? 1 : -1) : -1 );
      listOfRanks.forEach(rank => {
        returnMovieList.push(this.state.data.filter(review => {return review.ID === rank.Review_ID})[0])
      })
      if(this.state.toggleLeast){
        return returnMovieList.reverse();
      } else {
        return returnMovieList;
      }
    }
  }

  returnCecilRank = (id) => {
    return this.state.data.filter(review => {return review.ID === id})[0].Cecil_Rank;
  }

  handleSpoilerChange = () => {
    this.setState({spoilerFree: !this.state.spoilerFree})
  }  

  returnSpoilerStyle = () => {
    if(!this.state.spoilerFree){
      return null
    } else {
      return {color: 'white'}
    }
  }

  handleFilterChange = (e) => {
    this.setState({filterByRanking: e.target.value})
  }

  handleToggleLeastChange = () => {
    this.setState({toggleLeast: !this.state.toggleLeast})
  }

  render() {
    return(
      <div>
        <h2>Movie Reviews by Cecil:</h2>
        <p>Filter by: </p>
        <select onChange={this.handleFilterChange}>
          <option key={8}>Cecil Rank</option>
          {
            this.state.rankingCategories.map(category => 
              <option key={category.ID}>{category.Name}</option>
            )
          }
        </select>
        <p>Ties are won by the "Cecil Rank"</p>
        <p>Toggle Least <input onChange={this.handleToggleLeastChange} checked={this.state.toggleLeast} type='checkbox'></input></p> 
        <p>Spoiler Free? <input checked={this.state.spoilerFree} onChange={this.handleSpoilerChange} type='checkbox'></input></p>
        {
          this.state.data ? 
          this.filterReviews().map(entry => 
            <div key={entry.ID}>
              <h4>{entry.Title}:</h4>
              <h5>The Cecil Rank: #{entry.Cecil_Rank}</h5>
              {
                entry.rankings.map((rank, i) =>
                rank.Review_ID === entry.ID ? 
                <div key={i}>
                  <h5>{rank.Category_Name}: ({rank.Value}/8)</h5>
                  <StarRatings 
                    rating={rank.Value}
                    starRatedColor='orange'
                    numberOfStars={8}
                    name={rank.Category_Name}
                  />
                </div> : null
                )
              }
              <h5>Review:</h5>              
              {
                entry.content.map(paragraph => 
                  paragraph.Spoiler ? <p style={this.returnSpoilerStyle()} key={paragraph.ID}>{paragraph.Text}</p> : <p key={paragraph.ID}>{paragraph.Text}</p>
                )
              }
              <h5>Movie Info:</h5>
              <div>
                <p>Director: {entry.Director}</p>
                <p>Genre: {entry.Genre}</p> 
                <p>Rated: {entry.Rated}</p>
                <p>Released: {entry.Release}</p>
                <p>Written By: {entry.Writer}</p>
                <p>Plot: {entry.Plot}</p>
                <img src={entry.Poster_URL} alt={`Poster of ${entry.Title}`}/>
              </div>
            </div>
          ) :
          <p>Loading...</p>
        }
      </div>
    )
  }
}

export default MovieReview;