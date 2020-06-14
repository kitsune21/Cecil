import React, {Component} from 'react';
import {Container, Card, ListGroup, Image} from 'react-bootstrap';
import bass from './Images/bass.jpg';

class HomeContent extends Component {

  render() {
    return(
      <Container fluid>
          <Card>
            <Card.Title>Social</Card.Title>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>Twitter</ListGroup.Item>
                <ListGroup.Item>Discord</ListGroup.Item>
                <ListGroup.Item>Twitch</ListGroup.Item>
                <ListGroup.Item>GitHub</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Title>Picture</Card.Title>
            <Card.Body>
              <Image src={bass}/>
            </Card.Body>
          </Card>
          <Card>
            <Card.Title>About Me</Card.Title>
          </Card>
        </Container>
    )
  }
}

export default HomeContent;