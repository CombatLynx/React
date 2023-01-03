import React from "react";
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator,
    setTotalCountActionCreator,
    setUsersActionCreator,
    unfollowActionCreator
} from "../../redux/user-reducer";
import UsersClass from "./UsersClass";

let mapStateToProps = (state) => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching
    }
}

const UsersContainer = connect(mapStateToProps, {
    onFollow: followActionCreator,
    onUnfollow: unfollowActionCreator,
    setUsers: setUsersActionCreator,
    setCurrentPages: setCurrentPageActionCreator,
    setTotalCount: setTotalCountActionCreator,
    toggleIsFetching: setIsFetchingActionCreator
})(UsersClass);

export default UsersContainer;