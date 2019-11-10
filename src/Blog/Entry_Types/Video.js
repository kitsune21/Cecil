import React, { Component } from 'react';

class Video extends Component {

  render() {
    return(
      <div>
        <iframe src={this.props.value} title='x'/>
      </div>
    )
  }
}

export default Video;