import React from 'react';
import {Container, Card, ListGroup, Carousel } from 'react-bootstrap';
import cactus from './pics/cactus.png';
import skel1 from './pics/skeleton1.png';
import skel2 from './pics/skeleton2.png';
import stad1 from './pics/stadium1.png';
import stad2 from './pics/stadium2.png';
import sushi1 from './pics/sushi1.png';
import sushi2 from './pics/sushi2.png';


function Minecraft () {

    return(
        <Container fluid>
            <Card>
                <Card.Title>Nimbus Land</Card.Title>
                <Card.Body>
                    This is my Minecraft server that is running on an AWS Lightsail server. (Hence the name "Nimbus Land)<br/>
                    We currently run on Java v1.16.5.<br/>
                    We don't have any mods installed on the server at this point.<br/>
                    We enjoy automation for as many resources as we can.<br/>
                    To join the server please reach out to me directly.<br/>
                    You can check out the seed as well: 5067277305926773713 (The spawn point has been moved to: -2043, 73, -1258)<br/>
                    Some Notable Settings:
                    <ul>
                        <li>We have keep inventory on</li>
                        <li>Hard Difficulty</li>
                    </ul>
                </Card.Body>
            </Card>
            <Card>
                <Card.Title>Some of our Projects:</Card.Title>
                <Carousel
                    interval={4000}
                >
                    <Carousel.Item>
                        <img className="d-block w-100" src={cactus} alt='Automated Cactus/Bone Meal farm'/>
                        <Carousel.Caption><h3 style={{marginBottom: '800px'}}>Automated Cactus and/or Bone Meal Farm</h3></Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100" src={skel1} alt='Skeleton Farm'/>
                        <Carousel.Caption><h3 style={{marginBottom: '800px'}}>Skeleton farm. Useful for bone meal and arrows</h3></Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100" src={skel2} alt='Skeleton farm'/>
                        <Carousel.Caption><h3 style={{marginBottom: '800px'}}>Skeleton farm. Useful for bone meal and arrows</h3></Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100" src={sushi1} alt='Conveyor Belt Sushi Restaurant'/>
                        <Carousel.Caption><h3 style={{marginBottom: '800px'}}>Hamazushi, Conveyor Belt Sushi Restaurant</h3></Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100" src={sushi2} alt='Hamazushi'/>
                        <Carousel.Caption><h3 style={{marginBottom: '800px'}}>Hamazushi, Conveyor Belt Sushi Restaurant</h3></Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100" src={stad1} alt='Rugby Stadium'/>
                        <Carousel.Caption><h3 style={{marginBottom: '800px'}}>Nimbus Land Stadium. Home of the Hamazushi Ocelots</h3></Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img className="d-block w-100" src={stad2} alt='Rugby Pitch'/>
                        <Carousel.Caption><h3 style={{marginBottom: '800px'}}>Nimbus Land Stadium. Home of the Hamazushi Ocelots</h3></Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Card>
            <Card>
                <Card.Title>Server Rules</Card.Title>
                <Card.Body>
                    <Card.Subtitle>Failure to comply by all of the rules will result in an IP ban at my discretion.</Card.Subtitle>
                    <ListGroup>
                        <ListGroup.Item>No Stealing</ListGroup.Item>
                        <ListGroup.Item>No Destroying Others Work</ListGroup.Item>
                        <ListGroup.Item>No Griefing</ListGroup.Item>
                        <ListGroup.Item>No Offensive Minecraft Skins</ListGroup.Item>
                        <ListGroup.Item>No Sharing The Server IP Without My Permission</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Minecraft;