
import React, {Component} from 'react';
import {TopBar,TopBarRight,TopBarLeft} from 'react-foundation';
import {Menu,MenuItem,MenuText} from 'react-foundation';
import {Icon} from 'react-foundation';

class MenuBar extends Component {

  render() {
    return (
      <div>
        <TopBar className='my-top-bar-right'>
          <TopBarLeft>
            <Menu>
              <MenuText>Cecil</MenuText>
              <MenuItem isActive><a>Test</a></MenuItem>
              <MenuItem><a>Test2</a></MenuItem>
            </Menu>
          </TopBarLeft>
          <TopBarRight>
            <Menu>
              <MenuItem>Test</MenuItem>
            </Menu>
          </TopBarRight>
        </TopBar>
      </div>
    )
  }
}

export default MenuBar;