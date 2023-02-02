import React from "react";
import User from "./User";
import PaginationUsers from "./PaginatonUsers/PaginationUsers";

const Users = (props) => {
    let users = props.users.map(
        (user) => {
            return <User user={user}
                         follow={props.follow}
                         unfollow={props.unfollow}
                         isFollowing={props.isFollowing}
                         toggleIsFollowing={props.toggleIsFollowing}
            />
        })

    return (
        <div>
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