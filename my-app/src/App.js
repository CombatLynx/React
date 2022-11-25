import React, { Component } from "react";
import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Content from "./components/Content";

class App extends Component {
    render() {
        return (
            <div className="app-wrapper">
                <div className="app-wrapper__container">
                    <Header></Header>
                    <Navbar></Navbar>
                    <Content></Content>
                </div>
            </div>
        );
    }
}

export default App;