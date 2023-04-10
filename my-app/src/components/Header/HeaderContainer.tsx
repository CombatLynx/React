import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logOutThunkCreator} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    userId: number | null,
    login: string | null,
    isAuth: boolean
}

type MapDispatchToPropsType = {
    logOut: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (
            <Header isAuth={this.props.isAuth}
                    userId={this.props.userId}
                    login={this.props.login}
                    logOut={this.props.logOut}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        userId: state.auth.userId,
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps, {
    logOut: logOutThunkCreator
})(HeaderContainer);