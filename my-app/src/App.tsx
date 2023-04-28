import React from "react";
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News";
import Music from "./components/Music";
import Settings from "./components/Settings/Settings";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initializeUserThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader";
import {compose} from "redux";
import {AppStateType} from "./redux/redux-store";
import {FriendsType} from "./redux/sidebar-reducer";
import {UsersPage} from "./components/Users/UsersPage";
import {LoginContainer} from "./components/Login/LoginContainer";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"));

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

type DataNavbar = {
    dataNavbar: Array<FriendsType>
}

type MapStatePropsType = {
    initialized: boolean,
}

type MapDispatchPropsType = {
    initializeUser: () => void
}

class App extends React.Component<MapStatePropsType & MapDispatchPropsType & DataNavbar> {

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
                                   element={<SuspendedProfile/>}>
                            </Route>
                            <Route path='/profile'
                                   element={<SuspendedProfile/>}/>
                            <Route path="/dialogs"
                                   element={<SuspendedDialogs/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/users" element={<UsersPage title={"Hello people"}/>}/>
                            <Route path="/login" element={<LoginContainer/>}/>
                            <Route path="/chat" element={<SuspendedChatPage/>}/>
                            <Route path="*" element={<div>404 NOT FOUND</div>}/>
                            <Route path="/" element={<Navigate to='/profile'/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized
    }
}

export default compose(
    connect(mapStateToProps, {
        initializeUser: initializeUserThunkCreator
    })
)(App);