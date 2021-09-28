import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { Container, Row, Col, Popover, OverlayTrigger, Tooltip, Navbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class MovieReview extends Component {

  constructor(props) {
    super(props);
    this.scrollPos = React.createRef();
  }


  state={
    filterByRanking: 'Cecil Rank',
    spoilerFree: true,
    toggleLeast: false,
    rankingCategories: [],
    reviewSearch: '',
  }

  componentDidMount() {
    this.getMovieReviews();
    this.getRankingCategories();
  }

  getMovieReviews = () => {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/movie_reviews",
    })
    .then( data => {
      this.setState({data: data.data.reviews})
    })
    .catch( err => { console.log(err)});
  }

  getRankingCategories = () => {
    axios({
      method: "GET",
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/ranking_category"
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

  fuzzy_match = (str,pattern) => {
    pattern = pattern.split("").reduce(function(a,b){ return a+".*"+b; });
    return (new RegExp(pattern)).test(str);
  };

  filterReviews = () => {
    if(this.state.filterByRanking === 'Cecil Rank'){
      if(this.state.toggleLeast){
        return this.state.data.sort((a, b) => (a.Cecil_Rank > b.Cecil_Rank) ? 1 : -1).reverse()
      } else {
        return this.state.data.sort((a, b) => (a.Cecil_Rank > b.Cecil_Rank) ? 1 : -1);
      }
    } else if(this.state.filterByRanking === 'Search by Movie Info') {
      let returnMovieList = [];
      if(this.state.reviewSearch.length > 1){
        this.state.data.forEach(review => {
          if(this.fuzzy_match(review.Director, this.state.reviewSearch)) {
            returnMovieList.push(review)
          } else if(this.fuzzy_match(review.Genre, this.state.reviewSearch)) {
            returnMovieList.push(review)
          } else if(this.fuzzy_match(review.Writer, this.state.reviewSearch)) {
            returnMovieList.push(review)
          } 
        })
        return returnMovieList;
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

  handleReviewSearchChange = (e) => {
    this.setState({reviewSearch: e.target.value});
  }

  formatDate = date => {
    let newDate = new Date(date);
    return `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`;
  }

  calculateScrollPos = review => {
    return (this.scrollPos.current.offsetHeight * review) - (review < 15 ? 500 : 400)
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

  displayRankingOverlay = rank => {
    return (
      <Popover>
        <Popover.Content>
          <p>{rank.Description}</p>
        </Popover.Content>
      </Popover>
    )
  }

  displayScrollButtons = () => {
    let scrollList = [];
    for(let i = 0; i < this.state.data?.length; i++){
      if(i % 5 === 0){
        if(i !== 0){
          scrollList.push(i);
        }
      } else if( i === 1) {
        scrollList.push(i)
      }
    }
    return scrollList;
  }

  render() {
    return(
      <div>
        <h2>Movie Reviews by Cecil:</h2>
        <Navbar sticky='top' bg='dark' variant='dark'>
          <Navbar.Brand>Jump To:</Navbar.Brand>
            {
              this.displayScrollButtons().map(pos => 
                <Navbar.Brand key={pos}><button onClick={() => window.scrollTo(0, this.calculateScrollPos(pos))}>{pos}</button></Navbar.Brand>
              )
            }
          <Navbar.Brand>Filter By: </Navbar.Brand>
          <select onChange={this.handleFilterChange} style={{width: '20%', marginTop: '15px', marginRight: '20px'}}>
            <option key={8}>Cecil Rank</option>
            <option key={9}>Search by Movie Info</option>
            {
              this.state.rankingCategories.map(category => 
                <option key={category.ID}>{category.Name}</option>
              )
            }
          </select>
          {
            this.state.filterByRanking === 'Search by Movie Info' ? 
            <OverlayTrigger key="right2" placement='right' overlay={
              <Tooltip id={'tooltip'}>
                Search for director, writer, or genre
              </Tooltip>
            }>
              <Navbar.Brand>Search: <input onChange={this.handleReviewSearchChange} value={this.state.reviewSearch}/></Navbar.Brand>
            </OverlayTrigger>
            : null
          }
          <ToggleButtonGroup type='radio' name='spoiler' className='spoilerButtons' defaultValue={true} onChange={this.handleSpoilerChange}>
            <ToggleButton id='toggle-check-no' value={true}>No Spoilers</ToggleButton>
            <ToggleButton id='toggle-check-yes' value={false}>Spoilers</ToggleButton>
          </ToggleButtonGroup>
        </Navbar>
        <Container fluid>
          <Col>
          <Row>
          {
            this.state.data ? 
            this.filterReviews().map((entry, i) => 
              <Container fluid key={entry.ID} id={`movieReview_${entry.Cecil_Rank}`} style={{paddingBottom: "50px"}} ref={entry.Cecil_Rank === 1 ? this.scrollPos : null}>
                <Row>
                  <Col>
                    <h4>{entry.Title}:</h4>
                    <OverlayTrigger placement='top' overlay={
                      <Tooltip id={'tooltip'}>
                        Cecil Rank is just my opinion on how enjoyable a movie is. It is very not scientific. It doesn't correlate with the ranking on the various categories.
                      </Tooltip>
                    }>
                      <h5>The Cecil Rank: #{entry.Cecil_Rank}</h5>
                    </OverlayTrigger>
                    {
                      this.state.filterByRanking !== 'Cecil Rank' || this.state.toggleLeast ? <h5>Review Number: {i + 1}</h5> : null
                    }
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
                        <OverlayTrigger trigger="click" placement="top" overlay={this.displayRankingOverlay(rank)}>
                        <h5>{rank.Category_Name}: ({rank.Value}/8)</h5>
                        </OverlayTrigger>
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
                      entry.content.sort((a, b) => ( a.Spoiler === b.Spoiler ? 0 : a.Spoiler ? 1 : -1)).map(paragraph => 
                        <p key={paragraph.ID}>{paragraph.Spoiler ? !this.state.spoilerFree ? paragraph.Text : null : paragraph.Text}</p>
                      )
                    }
                  </Col>
                </Row>
              </Container>
            ) :
            <p>Loading...</p>
          }
          </Row>
          </Col>
        </Container>
      </div>
    )
  }
}

export default MovieReview;