import React, { Component } from 'react';

class Image extends Component {

  render() {
    return(
      <div>
        <img src={this.props.value} alt='random' />
      </div>
    )
  }
}

export default Image;