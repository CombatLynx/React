import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUsersProfileActionCreator} from "../../redux/profile-reducer";
import {useLocation, useParams} from "react-router-dom";
import {profileApi} from "../../dal/api";

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
        let userId = this.props.router.params.userId;
        profileApi.getProfile(userId)
            .then(data => {
                this.props.setUsersProfile(data);
            });
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

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    setUsersProfile: setUsersProfileActionCreator
})(WithUrlDataContainerComponent);