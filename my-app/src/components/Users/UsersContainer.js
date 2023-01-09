import React from "react";
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setFollowingProgressActionCreator,
    setIsFetchingActionCreator,
    setTotalCountActionCreator,
    setUsersActionCreator,
    unfollowActionCreator
} from "../../redux/user-reducer";
import {userApi} from "../../dal/api";
import Preloader from "../common/Preloader";
import Users from "./Users";

class UsersContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching(true);
        userApi.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalCount(data.totalCount);
            });
    }

    onCurrentPage = (currentPage) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPages(currentPage);
        userApi.getUsers(currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            });
    }

    render() {
        return (
            <>
                <div>{this.props.isFetching ? <Preloader /> : null}</div>
                <Users onCurrentPage={this.onCurrentPage}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       onFollow={this.props.onFollow}
                       onUnfollow={this.props.onUnfollow}
                       followingProgress={this.props.followingProgress}
                       toggleIsFollowing={this.props.toggleIsFollowing}
                />
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching,
        followingProgress: state.userPage.followingProgress
    }
}

export default connect(mapStateToProps, {
    onFollow: followActionCreator,
    onUnfollow: unfollowActionCreator,
    setUsers: setUsersActionCreator,
    setCurrentPages: setCurrentPageActionCreator,
    setTotalCount: setTotalCountActionCreator,
    toggleIsFetching: setIsFetchingActionCreator,
    toggleIsFollowing: setFollowingProgressActionCreator
})(UsersContainer);