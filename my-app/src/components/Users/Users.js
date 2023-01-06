import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/icon-man.png";
import {NavLink} from "react-router-dom";
import axios from "axios";

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

                                  axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                                      {
                                          withCredentials: true
                                      })
                                      .then(response => {
                                          if (response.data.resultCode === 0) {
                                              props.onUnfollow(user.id);
                                          }
                                      });
                              }}>unfollow</button>
                              : <button onClick={() => {
                                  axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                                      {},
                                      {
                                          withCredentials: true
                                      })
                                      .then(response => {
                                          if (response.data.resultCode === 0) {
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
