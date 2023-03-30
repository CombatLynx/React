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
import {NavigateFunction, Params, useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

// type MapStateToPropsType = ReturnType<typeof mapStateToProps>
//
// type MapDispatchToPropsType = {
//     getProfile: () => void,
//     getStatusProfile: () => void,
//     updateStatusProfile: () => void,
//     savePhotoProfile: () => void,
//     saveProfileInfo: () => void
// }

// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return (
//             <Component
//                 {...props}
//                 router={{ location, navigate, params }}
//             />
//         );
//     }
//     return ComponentWithRouterProp;
// }

interface PropsType extends PropsWithRouter {
    authorizedUserId: boolean,
    status: string,
    profile: ProfileType,
    isOwner: boolean
}

interface Router {
    location: Location
    navigate: NavigateFunction
    params: Readonly<Params<string>>
}

export interface PropsWithRouter {
    router: Router
}

export function withRouter<T extends PropsWithRouter>(
    Component: React.FC<T>
): React.FC<Omit<T, "router">> {
    function ComponentWithRouterProp(props: T) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return <Component {...props} router={{location, navigate, params}}/>
    }

    return ComponentWithRouterProp as React.FC<Omit<T, "router">>
}

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        const { userId } = useParams();

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

const mapStateToProps = (state: AppStateType) => {
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