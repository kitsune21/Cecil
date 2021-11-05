import React from 'react';
import StarRatings from 'react-star-ratings';
import { Container, Row, Col, Popover, OverlayTrigger, Tooltip, Navbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMovieReviews, getRankingCategories } from '../../API/api'

function MovieReview() {

  const scrollPos = React.useRef();

  const [ reviews, setReviews ] = React.useState([])
  const [ filterByRanking, setFilterByRanking ] = React.useState('Cecil Rank')
  const [ spoilerFree, setSpoilerFree ] = React.useState(true)
  const [ rankingCategories, setRankingCategories ] = React.useState([])
  const [ reviewSearch, setReviewSearch ] = React.useState('')

  React.useEffect(() => {
    getMovieReviews(setReviews)
    getRankingCategories(setRankingCategories)
  }, [])

  function fuzzy_match(str,pattern) {
    pattern = pattern.split("").reduce((a,b) => { return a+".*"+b; })
    return (new RegExp(pattern)).test(str)
  };

  function filterReviews() {
    if(filterByRanking === 'Cecil Rank'){
      return reviews.sort((a, b) => (a.Cecil_Rank > b.Cecil_Rank) ? 1 : -1);
    } else if(filterByRanking === 'Search by Movie Info') {
      let returnMovieList = [];
      if(reviewSearch.length > 1){
        reviews.forEach(review => {
          if(fuzzy_match(review.Title, reviewSearch)) {
            returnMovieList.push(review)
          } else if(fuzzy_match(review.Director, reviewSearch)) {
            returnMovieList.push(review)
          } else if(fuzzy_match(review.Genre, reviewSearch)) {
            returnMovieList.push(review)
          } else if(fuzzy_match(review.Writer, reviewSearch)) {
            returnMovieList.push(review)
          }
        })
        return returnMovieList;
      } else {
        return reviews.sort((a, b) => (a.Cecil_Rank > b.Cecil_Rank) ? 1 : -1)
      }
    } else {
      let returnMovieList = [];
      let listOfRanks = [];
      reviews.forEach(review => {
        review.rankings.forEach(rank => {
          if(rank.Category_Name === filterByRanking){
            listOfRanks.push(rank);
          }
        })
      })
      listOfRanks.sort((a, b) => (a.Value < b.Value) ? 1 : (a.Value === b.Value) ? ((returnCecilRank(a.Review_ID) > returnCecilRank(b.Review_ID)) ? 1 : -1) : -1 );
      listOfRanks.forEach(rank => {
        returnMovieList.push(reviews.filter(review => {return review.ID === rank.Review_ID})[0])
      })
      if(this.state.toggleLeast){
        return returnMovieList.reverse();
      } else {
        return returnMovieList;
      }
    }
  }

  function returnCecilRank(id) {
    return reviews.filter(review => {return review.ID === id})[0].Cecil_Rank;
  }

  function handleSpoilerChange() {
    setSpoilerFree(!spoilerFree)
  }  

  function handleFilterChange (e) {
    setFilterByRanking(e.target.value)
  }

  function handleReviewSearchChange(e) {
    setReviewSearch(e.target.value)
  }

  function formatDate(date) {
    let newDate = new Date(date);
    return `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`;
  }

  function calculateScrollPos(review) {
    return (scrollPos.current.offsetHeight * review) - (review < 15 ? 500 : 400)
  }

  function displayOverlay(entry) {
    return(
      <Popover>
        <Popover.Title>Movie Info:</Popover.Title>
        <Popover.Content>
          <div>
            <p>Director: {entry.Director}</p>
            <p>Genre: {entry.Genre}</p> 
            <p>Rated: {entry.Rated}</p>
            <p>Released: {formatDate(entry.Release)}</p>
            <p>Written By: {entry.Writer}</p>
            <p>Plot: {entry.Plot}</p>
          </div>
        </Popover.Content>
      </Popover>
    )
  }

  function displayRankingOverlay(rank) {
    return (
      <Popover>
        <Popover.Content>
          <p>{rank.Description}</p>
        </Popover.Content>
      </Popover>
    )
  }

  function displayScrollButtons() {
    let scrollList = [];
    for(let i = 0; i < reviews?.length; i++){
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

  return(
    <div>
      <h2>Movie Reviews by Cecil:</h2>
      <Navbar sticky='top' bg='dark' variant='dark'>
        <Navbar.Brand>Jump To:</Navbar.Brand>
          {
            displayScrollButtons().map(pos => 
              <Navbar.Brand key={pos}><button onClick={() => window.scrollTo(0, calculateScrollPos(pos))}>{pos}</button></Navbar.Brand>
            )
          }
        <Navbar.Brand>Filter By: </Navbar.Brand>
        <select onChange={handleFilterChange} style={{width: '20%', marginTop: '15px', marginRight: '20px'}}>
          <option key={8}>Cecil Rank</option>
          <option key={9}>Search by Movie Info</option>
          {
            rankingCategories.map(category => 
              <option key={category.ID}>{category.Name}</option>
            )
          }
        </select>
        {
          filterByRanking === 'Search by Movie Info' ? 
          <OverlayTrigger key="right2" placement='right' overlay={
            <Tooltip id={'tooltip'}>
              Search for director, writer, or genre
            </Tooltip>
          }>
            <Navbar.Brand>Search: <input onChange={handleReviewSearchChange} value={reviewSearch}/></Navbar.Brand>
          </OverlayTrigger>
          : null
        }
        <ToggleButtonGroup type='radio' name='spoiler' className='spoilerButtons' defaultValue={true} onChange={handleSpoilerChange}>
          <ToggleButton id='toggle-check-no' value={true}>No Spoilers</ToggleButton>
          <ToggleButton id='toggle-check-yes' value={false}>Spoilers</ToggleButton>
        </ToggleButtonGroup>
      </Navbar>
      <Container fluid>
        <Col>
        <Row>
        {
          reviews ? 
          filterReviews().map((entry) => 
            <Container fluid key={entry.ID} id={`movieReview_${entry.Cecil_Rank}`} style={{paddingBottom: "50px"}} ref={entry.Cecil_Rank === 1 ? scrollPos : null}>
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
                  <OverlayTrigger trigger="click" placement="right" overlay={displayOverlay(entry)}>
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
                      <OverlayTrigger trigger="click" placement="top" overlay={displayRankingOverlay(rank)}>
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
                      <p key={paragraph.ID}>{paragraph.Spoiler ? !spoilerFree ? paragraph.Text : null : paragraph.Text}</p>
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

export default MovieReview;