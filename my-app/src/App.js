import React from "react";
import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import News from "./components/News";
import Music from "./components/Music";
import Settings from "./components/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = (props) => {
    return (
        <div className="app-wrapper">
            <div className="app-wrapper__container">
                <Header/>
                <Navbar/>
                <div className="app-wrapper__container__content">
                    <Routes>
                        <Route path="/" element="Hello, this is very cool social network"/>
                        <Route path="/profile"
                               element={<Profile/>}/>
                        <Route path="/dialogs"
                               element={<DialogsContainer/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;