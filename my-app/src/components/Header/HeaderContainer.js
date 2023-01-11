import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthThunkCreator} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAuthUserData();
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
    getAuthUserData: getAuthThunkCreator
})(HeaderContainer);