import React, { Component } from 'react';
import axios from 'axios';

class Games extends Component {

  state = {
    myGames: null
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: "http://localhost:3001/api/games",
    })
    .then(data => {
      this.setState({myGames: data.data.data});
    })
    .catch(err => {console.log(err)});
  }

  render() {
    return(
      <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
        <h3>Games:</h3>
        {
          this.state.myGames !== null ?
          this.state.myGames.map( entry =>
            <ul key={entry.ID}>
              <li><a href={entry.Href} rel='noopener noreferrer' target='_blank'>{entry.Title}</a></li>
              <li>{entry.Description}</li>
              <li>Released: {this.props.returnFormattedDate(entry.Released)}</li>
            </ul>
          ) :
          <p>Loading...</p>
        }
      </div>
    )
  }
}

export default Games;