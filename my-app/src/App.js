import React from "react";
import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import News from "./components/News";
import Music from "./components/Music";
import Settings from "./components/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

const App = (props) => {
    return (
        <div className="app-wrapper">
            <div className="app-wrapper__container">
                <Header/>
                <NavbarContainer/>
                <div className="app-wrapper__container__content">
                    <Routes>
                        <Route path='/profile/:userId'
                            element={<ProfileContainer />}/>
                        <Route path="/dialogs"
                               element={<DialogsContainer/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;