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