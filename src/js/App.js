import React, {Component} from "react";
import ReactDOM from "react-dom";
import Navbar1 from "./Navbar";
import Main from "./Main";
import './app.css';

export default class App extends React.Component{
    render(){

        return (<>
                    <Navbar1/>
                    <Main />
                </>

        );
    }
}
