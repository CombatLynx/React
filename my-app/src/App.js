import React from "react";
import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
// import Profile from "./components/Profile";
import Dialogs from "./components/Dialogs";

const App = () => {
    return (
        <div className="app-wrapper">
            <div className="app-wrapper__container">
                <Header></Header>
                <Navbar></Navbar>
                <div class="app-wrapper__container__content">
                    {/*<Profile></Profile>*/}
                    <Dialogs></Dialogs>
                </div>
            </div>
        </div>
    );
}

export default App;