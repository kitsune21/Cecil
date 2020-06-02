import React, {Component} from 'react';
import './Menu.css'

class MenuBar extends Component {

  render() {
    return (
      <div>
        <ul id='menu'>
          <li id='menuTitle'><a href='/'>Cecil Thomas</a></li>
          <li id='menuItem'><a href='/movies'>Movie Reviews</a></li>
          {/* <li id='menuItem'><a href='/bucketlist'>Bucket List</a></li> */}
          <li id='menuItem'><a href='/resume'>Resume</a></li>
          {/* <li id='menuItem'><a href='/gas_tracker'>Gas Tracker</a></li> */}
          {/* <li id='menuItem'><a href='/blog'>Blog</a></li> */}
        </ul>
      </div>
    )
  }
}

export default MenuBar;