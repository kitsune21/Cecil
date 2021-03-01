import React from 'react';
import {Container, Card, ListGroup } from 'react-bootstrap';


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