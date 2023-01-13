import React from "react";
import {connect} from "react-redux";
import {followThunkCreator, getUsersThunkCreator,
    setFollowingProgressActionCreator, unfollowThunkCreator
} from "../../redux/user-reducer";
import Preloader from "../common/Preloader";
import Users from "./Users";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class UsersContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onCurrentPage = (currentPage) => {
        this.props.getUsers(currentPage, this.props.pageSize);
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
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       isFollowing={this.props.isFollowing}
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
        isFollowing: state.userPage.isFollowing
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        toggleIsFollowing: setFollowingProgressActionCreator,
        getUsers: getUsersThunkCreator,
        follow: followThunkCreator,
        unfollow: unfollowThunkCreator
    })
)(UsersContainer);