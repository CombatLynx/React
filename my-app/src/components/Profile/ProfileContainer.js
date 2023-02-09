import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileStatusThunkCreator,
    getProfileThunkCreator,
    savePhotoProfileThunkCreator,
    saveProfileInfoThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profile-reducer";
import {useLocation, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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
    refreshProfile() {
        if (!this.props.router.params.userId) {
            this.props.router.params.userId = this.props.authorizedUserId;
            if (!this.props.authorizedUserId) {
                this.props.history.push('/login');
            }
        }

        this.props.getProfile(this.props.router.params.userId);
        this.props.getStatusProfile(this.props.router.params.userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     authorizedUserId={this.props.authorizedUserId}
                     isOwner={this.props.router.params.userId}
                     status={this.props.status}
                     profile={this.props.profile}
                     updateStatusProfile={this.props.updateStatusProfile}
                     savePhotoProfile={this.props.savePhotoProfile}
                     saveProfileInfo={this.props.saveProfileInfo}
            />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId
    }
}

export default compose(
    connect(mapStateToProps, {
        getProfile: getProfileThunkCreator,
        getStatusProfile: getProfileStatusThunkCreator,
        updateStatusProfile: updateStatusThunkCreator,
        savePhotoProfile: savePhotoProfileThunkCreator,
        saveProfileInfo: saveProfileInfoThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);