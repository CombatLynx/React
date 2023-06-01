import React, {FC, useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {
    getProfileStatusThunkCreator,
    getProfileThunkCreator,
    savePhotoProfileThunkCreator,
    saveProfileInfoThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let params = useParams();
//         return (
//             <Component
//                 {...props}
//                 router={{location, params}}
//             />
//         );
//     }
//
//     return ComponentWithRouterProp;
// }

// const ProfileContainer: FC = (props) => {
//     const params = useParams()
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//
//     const profile = useSelector((state: AppStateType) => state.profilePage.profile)
//     const status = useSelector((state: AppStateType) => state.profilePage.status)
//     const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
//
//     let userId = Number(params.userId)
//
//     const refreshProfile = () => {
//         if (!userId) {
//             userId = Number(authorizedUserId)
//             if (!authorizedUserId) {
//                 navigate('/login')
//             }
//         }
//
//         dispatch<any>(getProfileThunkCreator(userId))
//         dispatch<any>(getProfileStatusThunkCreator(userId))
//     }
//
//     useEffect(() => {
//         refreshProfile()
//     }, [])
//
//     useEffect(() => {
//         refreshProfile()
//     }, [userId])
//
//     return (
//         <Profile aboutMe={""}
//                  contacts={[]}
//                  authorizedUserId={authorizedUserId as boolean | null}
//                  isOwner={userId}
//                  status={status}
//                  profile={profile}
//                  // updateStatusProfile={this.props.updateStatusProfile}
//                  // savePhotoProfile={this.props.savePhotoProfile}
//                  // saveProfileInfo={this.props.saveProfileInfo}
//         />
//     );
// }

const ProfileContainerHook: FC<any> = (props) => {
    let {userId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)

    const refreshProfile = () => {
        if (!userId) {
            userId = authorizedUserId
            if (!authorizedUserId) {
                navigate('/login')
            }
        }

        dispatch<any>(getProfileThunkCreator(userId as any))
        dispatch<any>(getProfileStatusThunkCreator(userId as any))
    }

    useEffect(() => {
        refreshProfile()
    }, [])

    useEffect(() => {
        refreshProfile()
    }, [userId])

    return (
        <>
            <Profile {...props}
                     authorizedUserId={authorizedUserId}
                     isOwner={userId}
                     status={status}
                     profile={profile}
                     savePhotoProfile={props.savePhotoProfile}
                     saveProfileInfo={props.saveProfileInfo}
                     updateStatusProfile={props.updateStatusProfile}
            />
        </>
    )
}

export default compose(
    connect(null, {
        getProfile: getProfileThunkCreator,
        getStatusProfile: getProfileStatusThunkCreator,
        updateStatusProfile: updateStatusThunkCreator,
        savePhotoProfile: savePhotoProfileThunkCreator,
        saveProfileInfo: saveProfileInfoThunkCreator
    }),
    // withAuthRedirect
)(ProfileContainerHook);

// class ProfileContainer extends React.Component {
//     refreshProfile() {
//         if (!this.props.router.params.userId) {
//             this.props.router.params.userId = this.props.authorizedUserId;
//             if (!this.props.authorizedUserId) {
//                 this.props.history.push('/login');
//             }
//         }
//
//         this.props.getProfile(this.props.router.params.userId);
//         this.props.getStatusProfile(this.props.router.params.userId);
//     }
//
//     componentDidMount() {
//         this.refreshProfile();
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (this.props.router.params.userId !== prevProps.router.params.userId) {
//             this.refreshProfile();
//         }
//     }
//
//     render() {
//         return (
//             <Profile {...this.props}
//                      authorizedUserId={this.props.authorizedUserId}
//                      isOwner={this.props.router.params.userId}
//                      status={this.props.status}
//                      profile={this.props.profile}
//                      updateStatusProfile={this.props.updateStatusProfile}
//                      savePhotoProfile={this.props.savePhotoProfile}
//                      saveProfileInfo={this.props.saveProfileInfo}
//             />
//         );
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         profile: state.profilePage.profile,
//         status: state.profilePage.status,
//         authorizedUserId: state.auth.userId
//     }
// }
//
// export default compose(
//     connect(mapStateToProps, {
//         getProfile: getProfileThunkCreator,
//         getStatusProfile: getProfileStatusThunkCreator,
//         updateStatusProfile: updateStatusThunkCreator,
//         savePhotoProfile: savePhotoProfileThunkCreator,
//         saveProfileInfo: saveProfileInfoThunkCreator
//     }),
//     withRouter,
//     withAuthRedirect
// )(ProfileContainer);