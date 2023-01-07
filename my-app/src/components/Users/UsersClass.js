import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {userApi} from "../../dal/api";

class UsersClass extends React.Component {

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
                />
            </>
        );
    }
}

export default UsersClass;
