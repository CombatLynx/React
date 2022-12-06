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

const App = (props) => {
    return (
        <div className="app-wrapper">
            <div className="app-wrapper__container">
                <Header/>
                <Navbar dataNavbar={props.appState.sidebar}/>
                <div className="app-wrapper__container__content">
                    <Routes>
                        <Route path="/" element="Hello, this is very cool social network"/>
                        <Route path="/profile"
                               element={<Profile dataPost={props.appState.profilePage}
                                                 addPost={props.addPost}
                                                 updatePostText={props.updatePostText}/>}/>
                        <Route path="/dialogs"
                               element={<Dialogs dataMessage={props.appState.messagesPage}/>}/>
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