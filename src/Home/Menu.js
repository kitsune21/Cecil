import React, {Component} from 'react';
import './Menu.css'

class MenuBar extends Component {

  render() {
    return (
      <div>
        <ul id='menu'>
          <li id='menuItem'>Cecil Thomas</li>
          <li id='menuItem'><a href='/'>Home</a></li>
          <li id='menuItem'><a href='/resume'>Resume</a></li>
          <li id='menuItem'><a href='/blog'>Blog</a></li>
        </ul>
      </div>
    )
  }
}

export default MenuBar;