import React, {Component} from 'react';
import HomeContent from './HomeContent.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeActive: true
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState( state => ({
      homeActive: !state.homeActive
    }))
  }

  render() {
    return(
      <div>
        <HomeContent />
      </div>
    )
  }
}

export default Home;