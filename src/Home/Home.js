import React, {Component} from 'react';
import MenuBar from './Menu.js'

class Home extends Component {
  render() {
    return(
      <div>
        <header>
          <MenuBar />
        </header>
        <section id='page-content'>
          <p>Sup</p>
        </section>
      </div>
    )
  }
}

export default Home;