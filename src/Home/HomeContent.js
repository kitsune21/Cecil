import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class HomeContent extends Component {

  render() {
    return(
      <div>
        <div id="home">
          <h2>Cecil-Thomas.com</h2>
          <ul>
            <li><Link to='/resume'>Resume</Link></li>
            <li><Link to='/blog'>Blog</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default HomeContent;