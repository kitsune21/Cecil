import React from 'react';
import {Container, Card, ListGroup, Image, Row, Col} from 'react-bootstrap';

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
import mailIcon from './Images/Icons/mail.png';

function HomeContent() {

  const [ picturesOfMe ] = React.useState([bass, bobafett, hiroshima, popeye, slurpee, withconnor])

  function randomPicture() {
    return picturesOfMe[Math.floor((Math.random() * (picturesOfMe.length - 1)) + 1)];
  }

  return(
    <Container fluid>
      <Row>
        <Col>
          <Card>  
            <Card.Title>About Me</Card.Title>
            <Card.Body>
              I really don't know what to put in this thing.
              My name is Cecil, I love programming.
              JavaScript is my jam!
              <br />
              I also really enjoy tinkering around with the Unity Game Engine (C#).
              <br />
              I love watching movies. Check out my movie reviews tab to see my current list of favorite movies.
              <br />
              The list will definitely change a lot. But let me know what you think!
              <br />
              Always enjoy connecting with people over social media. Don't be a stranger!
              <br />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Image src={randomPicture()} style={{width: "30%"}}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Title>Social</Card.Title>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item><Image src={twitterIcon} style={{width: "2%"}}/><a href='https://twitter.com/KiTsuNe_76' target='_blank' rel='noopener noreferrer'>  @KiTsuNe_76</a></ListGroup.Item>
                <ListGroup.Item><Image src={discordIcon} style={{width: "2%"}}/><a href='https://discord.com/'  target='_blank' rel='noopener noreferrer'>  KiTsuNe23#6401</a></ListGroup.Item>
                <ListGroup.Item><Image src={twitchIcon} style={{width: "2%"}}/><a href='https://www.twitch.tv/kitsune_23' target='_blank' rel='noopener noreferrer'>  twitch.tv/kitsune_23</a></ListGroup.Item>
                <ListGroup.Item><Image src={githubIcon} style={{width: "2%"}}/><a href='https://github.com/kitsune21' target='_blank' rel='noopener noreferrer'>  github.com/kitsune21</a></ListGroup.Item>
                <ListGroup.Item><Image src={linkedinIcon} style={{width: "2%"}}/><a href='https://www.linkedin.com/in/cecilthomas23/' target='_blank' rel='noopener noreferrer'>  linkedin.com/in/cecilthomas23/</a></ListGroup.Item>
                <ListGroup.Item><Image src={mailIcon} style={{width: "2%"}}/><a href="mailto: me@cecil-thomas.com">  me@cecil-thomas.com</a></ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default HomeContent;