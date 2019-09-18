import React, {Component} from 'react';
import MenuBar from './Menu.js';
import HomeContent from './HomeContent.js'
import Resume from './Resume.js';

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
        <header>
          <MenuBar changePage={this.handleClick} homeActive={this.state.homeActive} resumeActive={!this.state.homeActive}/>
        </header>
        <section id='page-content'>
          {this.state.homeActive ? <HomeContent /> : <Resume /> }
        </section>
      </div>
    )
  }
}

export default Home;