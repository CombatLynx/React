import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/icon-man.png";
import {NavLink} from "react-router-dom";
import {followApi} from "../../dal/api";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

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
            {
                props.users.map((user) => <div key={user.id}>
                      <span>
                          <div>
                              <NavLink to={"/profile/" + user.id}>
                                <img className={classes.photo}
                                     src={user.photos.small !== null ? user.photos.small : userPhoto} alt="image"/>
                              </NavLink>
                              </div>
                          <div>{user.followed
                              ? <button onClick={() => {
                                  followApi.onUnfollow(user.id)
                                      .then(data => {
                                          if (data.resultCode === 0) {
                                              props.onUnfollow(user.id);
                                          }
                                      });
                              }}>unfollow</button>
                              : <button onClick={() => {
                                  followApi.onFollow(user.id)
                                      .then(data => {
                                          if (data.resultCode === 0) {
                                              props.onFollow(user.id);
                                          }
                                      });
                              }}>follow</button>}
                          </div>
                      </span>
                    <span>
                          <span>
                              <div>{user.name}</div>
                              <div>{user.followed}</div>
                          </span>
                          <span>
                              <div>userId: {user.id}</div>
                              <div>country</div>
                              <div>city</div>
                          </span>
                      </span>
                </div>)
            }
        </div>
    );
}

export default Users;
