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
import {NavigateFunction, Params, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {PhotosType, ProfileType} from "../../types/types";

type MapStateToPropsType = {
    authorizedUserId: boolean | null,
    status: string | null,
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    getProfile: (userId: number) => void,
    getStatusProfile: (userId: number) => void,
    updateStatusProfile: (status: string | null) => void,
    savePhotoProfile: (file: File) => void,
    saveProfileInfo: (profile: ProfileType) => Promise<any>
}


interface PropsType extends PropsWithRouter {
    isOwner: any
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

class ProfileContainer extends React.Component<PropsType & MapStateToPropsType & MapDispatchPropsType> {
    refreshProfile() {

        // const [searchParams, setSearchParams] = useSearchParams();
        // let userId: any = searchParams.get("name")

        const queryParameters = new URLSearchParams(window.location.search)
        let userId: any = queryParameters.get("userId")

        // let userId: number | null = +this.props.router.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // todo: may be replace push with Redirect?
                // this.props.history.push('/login');

                window.location.href = '/login'

                // const navigate = useNavigate();
                // const goToLoginPage = () => navigate('/login');
                // goToLoginPage();
            }
        }

        if (!userId) {
            throw new Error("ID should exists in URL params or in state ('authorizedUserId')")
        } else {
            this.props.getProfile(userId);
            this.props.getStatusProfile(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile aboutMe={""} contacts={[]} {...this.props}
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

export default compose<React.ComponentType>(
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