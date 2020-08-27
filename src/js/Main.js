import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Row,Container,Col} from "react-bootstrap";

export default class Main extends React.Component{
    render(){

        return (<>
                  <Container className="container-main">
                      <Row>
                          <Col><p>Todays Count</p></Col>
                          <Col><p>Average Count Per Day</p></Col>
                          <Col><p>Monthly Count</p></Col>
                          <Col><p>Total Powercuts this year</p></Col>
                      </Row>
                      <Row className="count-row">
                          <Col><h1>0</h1></Col>
                          <Col><h1>0</h1></Col>
                          <Col><h1>0</h1></Col>
                          <Col><h1>0</h1></Col>
                      </Row>
                  </Container>
                    
                </>

        );
    }
}
