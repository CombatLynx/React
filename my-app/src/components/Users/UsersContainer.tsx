import React from "react";
import {connect} from "react-redux";
import {
    followThunkCreator,
    getUsersThunkCreator,
    unfollowThunkCreator
} from "../../redux/user-reducer";
import Preloader from "../common/Preloader";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching, getIsFollowing,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/selectors/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    portionSize: number,
    isFollowing: Array<number>,
    users: Array<UserType>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
    title: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onCurrentPage = (currentPage: number) => {
        this.props.getUsers(currentPage, this.props.pageSize);
    }

    render() {
        return (
            <>
                <div>{this.props.title}</div>
                <div>{this.props.isFetching ? <Preloader /> : null}</div>
                <Users onCurrentPage={this.onCurrentPage}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       isFollowing={this.props.isFollowing}
                       portionSize={this.props.portionSize}
                />
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state),
        portionSize: getPortionSize(state)
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, {
        getUsers: getUsersThunkCreator,
        follow: followThunkCreator,
        unfollow: unfollowThunkCreator
    })
)(UsersContainer);