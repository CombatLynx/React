import React, {FC} from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {logInThunkCreator} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

const LoginContainer: FC<MapStateToPropsType & MapDispatchPropsType> = (props) => {
    return (
        <>
            <Login onLogin={props.onLogin}
                   isAuth={props.isAuth}
                   captcha={props.captcha}
            />
        </>
    )
}

export type MapStateToPropsType = {
    isAuth: boolean,
    captcha: string | null
}

export type MapDispatchPropsType = {
    onLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export default connect(mapStateToProps, {
    onLogin: logInThunkCreator
})(LoginContainer);