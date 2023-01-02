import React from "react";
import {connect} from "react-redux";
import {
    followActionCreator,
    setCurrentPageActionCreator,
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
        currentPage: state.userPage.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onFollow: (userId) => {
            dispatch(followActionCreator(userId));
        },
        onUnfollow: (userId) => {
            dispatch(unfollowActionCreator(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users));
        },
        setCurrentPages: (pages) => {
            dispatch(setCurrentPageActionCreator(pages));
        },
        setTotalCount: (totalCount) => {
            dispatch(setTotalCountActionCreator(totalCount));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClass);

export default UsersContainer;