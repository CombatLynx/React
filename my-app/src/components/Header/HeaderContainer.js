import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {authApi} from "../../dal/api";
import {setAuthUserDataActionCreator} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        authApi.getAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    this.props.setAuthUserData(
                        data.data.id,
                        data.data.email,
                        data.data.login
                    )
                }
            });
    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {
    setAuthUserData: setAuthUserDataActionCreator
})(HeaderContainer);