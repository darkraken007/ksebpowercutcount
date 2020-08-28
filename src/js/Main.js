import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Row,Container,Col} from "react-bootstrap";


export default class Main extends React.Component{


    constructor(props){
        super(props);
        this.state = {"dailyCount":0,"monthlyCount":0,"yearlyCount":0,"averageCountPerDay":0,"totalCount":0,"monthlycount":0};
    }
    componentDidMount(){
        var url="https://ksebpowercutcount.herokuapp.com/getStat"
        const requestOptions = {
            method: 'GET'
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.setState(data))
            .catch(err => console.log(err));  
    }
    render(){

        return (<>
                  <Container className="container-main">
                      <Row>
                          <Col><p>Todays Count</p></Col>
                          <Col><p>Average Count Per Day</p></Col>
                          <Col><p>Monthly Count</p></Col>
                          <Col><p>Total Powercuts this year</p></Col>
                          <Col><p>Total Powercuts</p></Col>
                      </Row>
                      <Row className="count-row">
                          <Col><h1>{this.state.dailyCount}</h1></Col>
                          <Col><h1>{this.state.averageCountPerDay}</h1></Col>
                          <Col><h1>{this.state.monthlyCount}</h1></Col>
                          <Col><h1>{this.state.yearlyCount}</h1></Col>
                          <Col><h1>{this.state.totalCount}</h1></Col>
                      </Row>
                  </Container>
                    
                </>

        );
    }
}
