import React from "react";
import classes from "./Users.module.css";
import User from "./User";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

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
            <div>
                {pages.map(page => {
                    return <span className={props.currentPage === page ? classes["select-page"] : ""}
                                 onClick={() => {
                                     props.onCurrentPage(page)
                                 }}>{page}</span>
                })}
            </div>
            {users}
        </div>
    );
}

export default Users;