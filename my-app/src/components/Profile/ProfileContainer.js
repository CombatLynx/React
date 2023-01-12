import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator} from "../../redux/profile-reducer";
import {useLocation, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getProfile(this.props.router.params.userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

let mapStateToPropsForRedirectComponent = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirectComponent)(AuthRedirectComponent);

let WithUrlDataContainerComponent = withRouter(ConnectAuthRedirectComponent);

export default connect(mapStateToProps, {
    getProfile: getProfileThunkCreator
})(WithUrlDataContainerComponent);