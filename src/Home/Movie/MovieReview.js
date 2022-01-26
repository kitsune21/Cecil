import React from 'react'
import StarRatings from 'react-star-ratings'
import { Container, Row, Col, Popover, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { getMovieRankingByReviewID, getMovieContentByReviewID} from '../../API/api'

function MovieReview({review, scrollPos, spoilerFree}) {

  const [ myRankings, setMyRankings ] = React.useState()
  const [ myContent, setMyContent ] = React.useState()
  const [ spoilerCount, setSpoilerCount ] = React.useState()

  React.useEffect(() => {
    getMovieRankingByReviewID(setMyRankings, review.ID)
    getMovieContentByReviewID(setMyContent, setSpoilerCount, review.ID)
  }, [review.ID])

  function formatDate(date) {
    let newDate = new Date(date);
    return `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`;
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

  function sortBySpoiler() {
    let contentList = []
    myContent?.forEach(paragraph => {
      if(spoilerFree) {
        if(!paragraph.Spoiler) {
          contentList.push(paragraph)
        }
      } else {
        contentList.push(paragraph)
      }
    })
    return contentList.sort((a, b) => ( a.Spoiler === b.Spoiler ? 0 : a.Spoiler ? 1 : -1))
  }

  return(
    <Container fluid key={review.ID} id={`movieReview_${review.Cecil_Rank}`} style={{paddingBottom: "50px"}} ref={review.Cecil_Rank === 1 ? scrollPos : null}>
      <Row>
        <Col>
          <h4>{review.Title}:</h4>
          <OverlayTrigger placement='top' overlay={
            <Tooltip id={'tooltip'}>
              Cecil Rank is just my opinion on how enjoyable a movie is. It is very not scientific. It doesn't correlate with the ranking on the various categories.
            </Tooltip>
          }>
            <h5>The Cecil Rank: #{review.Cecil_Rank}</h5>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="right" overlay={displayOverlay(review)}>
            <img src={review.Poster_URL} alt={`Poster of ${review.Title}`}/>
          </OverlayTrigger>
        </Col>
        {
          window.outerWidth > 700 ?
          <Col>
          {
            myRankings?.map(rank =>
            rank.Review_ID === review.ID ? 
            <div key={rank.ID}>
              <OverlayTrigger trigger="click" placement="left" overlay={displayRankingOverlay(rank)}>
              <h5>{rank.Name}: ({rank.Value}/8)</h5>
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
            sortBySpoiler().map(paragraph =>
              <p key={paragraph.ID}>{paragraph.Text}</p>
            )
          }
          {
            spoilerCount > 0 && spoilerFree ?
            <p>{spoilerCount} Hidden Review{spoilerCount > 1 ? "'s" : null}</p>
            : null
          }
        </Col>
      </Row>
    </Container>
  )
}

export default MovieReview;