import React, { Component } from 'react';
import axios from 'axios';
import ItemsCarousel from 'react-items-carousel';

class Games extends Component {

  state = {
    myGames: null,
    activeItemIndex: 0
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: "https://6f4jesporh.execute-api.us-west-2.amazonaws.com/api/games",
    })
    .then(data => {
      this.setState({myGames: data.data.data});
    })
    .catch(err => {console.log(err)});
  }

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    return(
      <div className='portfolio' style={{width: '50%', paddingLeft: '30px'}}>
        <h3>Games:</h3>
        {
          this.state.myGames ? 
          <ItemsCarousel
            infiniteLoop
            gutter={5}
            numberOfCards={2}
            activeItemIndex={this.state.activeItemIndex}
            requestToChangeActive={this.onChange}
            leftChevron={<button>{'<'}</button>} 
            rightChevron={<button>{'>'}</button>}
            outsideChevron
            chevronWidth={20}
          >
          {
            this.state.myGames.map( entry =>
              <ul key={entry.ID} style={{ height: 200, width: '100%', background: '#EEE', padding: '5px', listStyle: 'none'}}>
                <li><a href={entry.Href} rel='noopener noreferrer' target='_blank'>{entry.Title}</a></li>
                <li>{entry.Description}</li>
                <li><b>Released: {this.props.returnFormattedDate(entry.Released)}</b></li>
              </ul> )
          }
          </ItemsCarousel>
          : <p>Loading...</p>
        }
      </div>
    )
  }
}

export default Games;