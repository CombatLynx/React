import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setUsersActionCreator, unfollowActionCreator} from "../../redux/user-reducer";

let mapStateToProps = (state) => {
    return {
        users: state.userPage.users
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
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;