import React from "react";
import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Dialogs from "./components/Dialogs";
import News from "./components/News";
import Music from "./components/Music";
import Settings from "./components/Settings";

const App = () => {
    return (
        <div className="app-wrapper">
            <div className="app-wrapper__container">
                <Header></Header>
                <Navbar></Navbar>
                <div className="app-wrapper__container__content">
                    <Routes>
                        <Route path="/" element="Hello, this is very cool social network"/>
                        <Route path="/profile" element={<Profile></Profile>}/>
                        <Route path="/dialogs" element={<Dialogs></Dialogs>}/>
                        <Route path="/news" element={<News></News>}/>
                        <Route path="/music" element={<Music></Music>}/>
                        <Route path="/settings" element={<Settings></Settings>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;