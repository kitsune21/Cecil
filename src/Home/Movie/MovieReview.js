import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { Container, Row, Col, Popover, OverlayTrigger, Accordion, Card, Tooltip} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  formatDate = date => {
    let newDate = new Date(date);
    return `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`;
  }

  displayOverlay = entry => {
    return(
      <Popover>
        <Popover.Title>Movie Info:</Popover.Title>
        <Popover.Content>
          <div>
            <p>Director: {entry.Director}</p>
            <p>Genre: {entry.Genre}</p> 
            <p>Rated: {entry.Rated}</p>
            <p>Released: {this.formatDate(entry.Release)}</p>
            <p>Written By: {entry.Writer}</p>
            <p>Plot: {entry.Plot}</p>
          </div>
        </Popover.Content>
      </Popover>
    )
  }

  render() {
    return(
      <div>
        <h2>Movie Reviews by Cecil:</h2>
        <Accordion defaultActiveKey="0" style={{width: "20%"}}>
          <Card>
            <Accordion.Toggle eventKey="0">Filters</Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <OverlayTrigger
                  key="right"
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip`}>
                      Ties are won by their "Cecil Rank"
                    </Tooltip>
                  }
                >
                <select onChange={this.handleFilterChange}>
                <option key={8}>Cecil Rank</option>
                {
                  this.state.rankingCategories.map(category => 
                    <option key={category.ID}>{category.Name}</option>
                  )
                }
                </select>
                </OverlayTrigger>
                <p>Reverse the order <input onChange={this.handleToggleLeastChange} checked={this.state.toggleLeast} type='checkbox'></input></p> 
                <p>{this.state.spoilerFree ? "Don't show spoilers" : "Show spoilers"}  <input checked={this.state.spoilerFree} onChange={this.handleSpoilerChange} type='checkbox'></input></p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <div style={{width: "100%"}}>
        {
          this.state.data ? 
          this.filterReviews().map(entry => 
            <Container fluid key={entry.ID} style={{paddingBottom: "50px"}}>
              <Row>
                <Col>
                  <h4>{entry.Title}:</h4>
                  <h5>The Cecil Rank: #{entry.Cecil_Rank}</h5>
                  <OverlayTrigger trigger="click" placement="right" overlay={this.displayOverlay(entry)}>
                    <img src={entry.Poster_URL} alt={`Poster of ${entry.Title}`}/>
                  </OverlayTrigger>
                </Col>
                {
                  window.outerWidth > 700 ?
                  <Col>
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
                  </Col> : null
                }
                <Col>
                  <h5>Review:</h5>              
                  {
                    entry.content.map(paragraph => 
                      paragraph.Spoiler ? <p style={this.returnSpoilerStyle()} key={paragraph.ID}>{paragraph.Text}</p> : <p key={paragraph.ID}>{paragraph.Text}</p>
                    )
                  }
                </Col>
              </Row>
            </Container>
          ) :
          <p>Loading...</p>
        }
        </div>
      </div>
    )
  }
}

export default MovieReview;