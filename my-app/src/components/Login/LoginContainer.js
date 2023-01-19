import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {logInThunkCreator} from "../../redux/auth-reducer";

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Login onLogin={this.props.onLogin}
                   isAuth={this.props.isAuth}
            />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {
    onLogin: logInThunkCreator
})(LoginContainer);