import React, { Component } from 'react';

class Link extends Component {

  render() {
    return(
      <div>
        <a href={this.props.value} rel='noopener noreferrer' target='_blank'>{this.props.value}</a>
      </div>
    )
  }
}

export default Link;