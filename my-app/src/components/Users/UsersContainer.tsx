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
    getUsers, getUsersFilter
} from "../../redux/selectors/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {FormikValues} from "formik";

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    portionSize: number,
    isFollowing: Array<number>,
    users: Array<UserType>,
    filter: FormikValues
}

type MapDispatchPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    getUsers: (currentPage: number, pageSize: number, filter: FormikValues) => void
}

type OwnPropsType = {
    title: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {filter} = this.props;
        this.props.getUsers(this.props.currentPage, this.props.pageSize, filter);
    }

    onCurrentPage = (currentPage: number) => {
        const {pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onFilterChange = (filter: FormikValues) => {
        const {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter);
    }

    render() {
        return (
            <>
                <div>{this.props.title}</div>
                <div>{this.props.isFetching ? <Preloader /> : null}</div>
                <Users onCurrentPage={this.onCurrentPage}
                       onFilterChange={this.onFilterChange}
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
        portionSize: getPortionSize(state),
        filter: getUsersFilter(state)
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