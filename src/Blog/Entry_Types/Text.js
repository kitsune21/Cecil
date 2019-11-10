import React, { Component } from 'react';

class Text extends Component {

  render() {
    return(
      <div>
        <p>{this.props.value}</p>
      </div>
    )
  }
}

export default Text;