import React, {Component} from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";

export default class Navbar1 extends React.Component{
    render(){

        return (
					<>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="#home">
                            KSEB Power Cut Count
                            </Navbar.Brand>
                        </Navbar>
                 </>
                

        );
    }
}
