import React, {Component} from 'react';
import {Container, Card, ListGroup, Image} from 'react-bootstrap';

import bass from './Images/bass.jpg';
import bobafett from './Images/bobafett.jpg';
import hiroshima from './Images/hiroshima.jpg';
import popeye from './Images/popeye.jpg';
import slurpee from './Images/slurpee.jpg';
import withconnor from './Images/withconnor.jpg';

import discordIcon from './Images/Icons/Discord-Logo-Color.png';
import twitterIcon from './Images/Icons/Twitter_Social_Icon_Circle_Color.png';
import twitchIcon from './Images/Icons/TwitchGlitchPurple.png';
import githubIcon from './Images/Icons/GitHub-Mark-64px.png';
import linkedinIcon from './Images/Icons/LI-In-Bug.png';

class HomeContent extends Component {

  state = {
    picturesOfMe: [bass, bobafett, hiroshima, popeye, slurpee, withconnor]
  }

  randomPicture = () => {
    return this.state.picturesOfMe[Math.floor((Math.random() * (this.state.picturesOfMe.length - 1)) + 1)];
  }

  render() {
    return(
      <Container fluid>
        <Card>  
          <Card.Title>About Me</Card.Title>
          <Card.Body>
            I really don't know what to put in this thing.
            My name is Cecil, I love programming.
            JavaScript is my jam!
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>Picture</Card.Title>
          <Card.Body style={{width: "30%"}}>
            <Image src={this.randomPicture()}/>
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>Social</Card.Title>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item><Image src={twitterIcon} style={{width: "2%"}}/><a href='https://twitter.com/KiTsuNe_76' target='_blank' rel='noopener noreferrer'>  @KiTsuNe_76</a></ListGroup.Item>
              <ListGroup.Item><Image src={discordIcon} style={{width: "2%"}}/>  KiTsuNe23#6401</ListGroup.Item>
              <ListGroup.Item><Image src={twitchIcon} style={{width: "2%"}}/><a href='https://www.twitch.tv/kitsune_23' target='_blank' rel='noopener noreferrer'>  twitch.tv/kitsune_23</a></ListGroup.Item>
              <ListGroup.Item><Image src={githubIcon} style={{width: "2%"}}/><a href='https://github.com/kitsune21' target='_blank' rel='noopener noreferrer'>  github.com/kitsune21</a></ListGroup.Item>
              <ListGroup.Item><Image src={linkedinIcon} style={{width: "2%"}}/><a href='https://www.linkedin.com/in/cecilthomas23/' target='_blank' rel='noopener noreferrer'>  linkedin.com/in/cecilthomas23/</a></ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default HomeContent;