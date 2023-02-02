import React from "react";
import {connect} from "react-redux";
import {
    followThunkCreator, getUsersThunkCreator, portionSizeActionCreator,
    setFollowingProgressActionCreator, unfollowThunkCreator
} from "../../redux/user-reducer";
import Preloader from "../common/Preloader";
import Users from "./Users";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getIsFetching, getIsFollowing,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/selectors/users-selectors";

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
                       portionSize={this.props.portionSize}
                />
            </>
        );
    }
}

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {
        toggleIsFollowing: setFollowingProgressActionCreator,
        getUsers: getUsersThunkCreator,
        follow: followThunkCreator,
        unfollow: unfollowThunkCreator
    })
)(UsersContainer);