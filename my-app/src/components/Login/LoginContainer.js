import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {logInThunkCreator} from "../../redux/auth-reducer";

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <>
                <Login onLogin={this.props.onLogin}
                       isAuth={this.props.isAuth}
                       captcha={this.props.captcha}
                />
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export default connect(mapStateToProps, {
    onLogin: logInThunkCreator
})(LoginContainer);