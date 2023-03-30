// import {Navigate} from "react-router-dom";
// import React, {Component} from "react";
// import {connect} from "react-redux";
// import {AppStateType} from "../redux/redux-store";
//
// const mapStateToPropsForRedirectComponent = (state: AppStateType) => {
//     return {
//         isAuth: state.auth.isAuth
//     }
// }
//
// type MapStatePropsType = {
//     isAuth: boolean
// }
//
// type MapDispatchPropsType = {}
//
// export function withAuthRedirect<WC extends MapStatePropsType>(Component: React.ComponentType<WC>) {
//     const RedirectWrapperComponent: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
//         const {isAuth, ...restProps} = props
//
//         if (!isAuth) return <Navigate to={"/login"}/>
//         return <Component {...restProps as WC}/>
//     }
//
//     return connect<MapStatePropsType, MapDispatchPropsType, WC, AppStateType>(mapStateToPropsForRedirectComponent)(RedirectWrapperComponent);
// }

// -------------------------------------------

import {Navigate} from "react-router-dom";
import React, {Component} from "react";
import {connect} from "react-redux";

let mapStateToPropsForRedirectComponent = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component) => {
    class RedirectWrapperComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={"/login"}/>
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirectComponent)(RedirectWrapperComponent);
}
