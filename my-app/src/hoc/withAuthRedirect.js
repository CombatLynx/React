import {Navigate} from "react-router-dom";
import React, {Component} from "react";

export const withAuthRedirect = (Component) => {
    class RedirectWrapperComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={"/login"}/>
            return <Component {...this.props}/>
        }
    }
    return RedirectWrapperComponent;
}