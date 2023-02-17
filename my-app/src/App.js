import React from "react";
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News";
import Music from "./components/Music";
import Settings from "./components/Settings";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {initializeUserThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader";
import {compose} from "redux";
import {withSuspense} from "./hoc/withSuspense";
import UsersContainer from "./components/Users/UsersContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.initializeUser();
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <div className="app-wrapper__container">
                    <HeaderContainer/>
                    <NavbarContainer/>
                    <div className="app-wrapper__container__content">
                        <Routes>
                            <Route path='/profile/:userId'
                                   element={withSuspense(ProfileContainer)}>
                            </Route>
                            <Route path='/profile'
                                   element={withSuspense(ProfileContainer)}/>
                            <Route path="/dialogs"
                                   element={withSuspense(DialogsContainer)}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/users" element={<UsersContainer title={"Hello people"}/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route path="*" element={<div>404 NOT FOUND</div>}/>
                            <Route path="/" element={<Navigate to='/profile'/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default compose(
    connect(mapStateToProps, {
        initializeUser: initializeUserThunkCreator
    })
)(App);