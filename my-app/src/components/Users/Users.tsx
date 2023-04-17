import React, {FC} from "react";
import User from "./User";
import PaginationUsers from "./PaginatonUsers/PaginationUsers";
import {UserType} from "../../types/types";
import UserSearchForm from "./UserSearchForm/UserSearchForm";
import {FormikValues} from "formik";

type PropsType = {
    users: Array<UserType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    isFollowing: Array<number>,
    totalUsersCount: number,
    pageSize: number,
    portionSize: number,
    currentPage: number,
    onCurrentPage: (page: number) => void,
    onFilterChange: (filter: FormikValues) => void
}

const Users: FC<PropsType> = (props) => {
    const users = props.users.map(
        (user) => {
            return <User key={user.id}
                         user={user}
                         follow={props.follow}
                         unfollow={props.unfollow}
                         isFollowing={props.isFollowing}
            />
        })

    return (
        <div>
            <div>
                <UserSearchForm onFilterChange={props.onFilterChange}
                />
            </div>
            <PaginationUsers totalUsersCount={props.totalUsersCount}
                             pageSize={props.pageSize}
                             currentPage={props.currentPage}
                             onCurrentPage={props.onCurrentPage}
                             portionSize={props.portionSize}
            />
            {users}
        </div>
    );
}

export default Users;