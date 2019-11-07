import React, {Component} from 'react';
import {TopBar,TopBarRight,TopBarLeft} from 'react-foundation';
import {Menu,MenuItem,MenuText} from 'react-foundation';
// import {Icon} from 'react-foundation';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.changePage();
  }

  render() {
    return (
      <div>
        <TopBar className='my-top-bar-right'>
          <TopBarLeft>
            <Menu>
              <MenuText>Cecil</MenuText>
              <MenuItem isActive={this.props.homeActive}><a href='/'>Home</a></MenuItem>
              <MenuItem isActive={this.props.resumeActive}><a href='/resume'>Resume</a></MenuItem>
              <MenuItem>Tools</MenuItem>
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