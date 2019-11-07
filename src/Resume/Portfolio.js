import React, { Component } from 'react';

class Portfolio extends Component {

  render() {
    return(
      <div className='portfolio'>
        <h3>Websites:</h3>
        <ul>
          <li><a href='http://frozenspade.tv' target='_blank' rel='noopener noreferrer'>Frozenspade.tv</a></li>
          <li><a href='http://assist.to' target='_blank' rel='noopener noreferrer'>Assist.TO</a></li>
        </ul>
      </div>
    )
  }
}

export default Portfolio;