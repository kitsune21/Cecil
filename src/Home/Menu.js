import React, {Component} from 'react';
import {TopBar,TopBarLeft} from 'react-foundation';
import {Menu,MenuItem,MenuText} from 'react-foundation';

class MenuBar extends Component {

  render() {
    return (
      <div>
        <TopBar className='my-top-bar-right'>
          <TopBarLeft>
            <Menu>
              <MenuText>Cecil Thomas</MenuText>
              <MenuItem isActive={this.props.homeActive}><a href='/'>Home</a></MenuItem>
              <MenuItem isActive={this.props.resumeActive}><a href='/resume'>Resume</a></MenuItem>
              <MenuItem isActive={this.props.blogActive}><a href='/blog'>Blog</a></MenuItem>
            </Menu>
          </TopBarLeft>
        </TopBar>
      </div>
    )
  }
}

export default MenuBar;