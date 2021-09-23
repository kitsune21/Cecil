import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'

class MenuBar extends Component {

  render() {
    return (
      <div>
        <ul id='menu'>
          <li id='menuTitle'><Link to='/'>Cecil Thomas</Link></li>
          <li id='menuItem'><Link to='/movies'>Movie Reviews</Link></li>
          <li id='menuItem'><Link to='/marathon/'>Movie Marathons</Link></li>
          {/* <li id='menuItem'><Link to='/minecraft'>Minecraft Server</Link></li> */}
          <li id='menuItem'><Link to='/resume'>Resume</Link></li>
          <li id='menuItem'><a href='https://toolring.cecil-thomas.com' rel='external' target='__blank'>ToolRing</a></li>
          {/* <li id='menuItem'><a href='/bucketlist'>Bucket List</a></li> */}
          {/* <li id='menuItem'><a href='/gas_tracker'>Gas Tracker</a></li> */}
          {/* <li id='menuItem'><a href='/blog'>Blog</a></li> */}
        </ul>
      </div>
    )
  }
}

export default MenuBar;