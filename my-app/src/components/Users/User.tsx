import React, {FC} from "react";
import classes from "./Users.module.css";
// @ts-ignore
import userPhoto from "../../assets/images/icon-man.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    isFollowing: Array<number>
}

const User: FC<PropsType> = ({user, follow, unfollow, isFollowing}) => {
    return (
        <div>
            {
                <div key={user.id}>
                      <span>
                          <div>
                              <NavLink to={"/profile/" + user.id}>
                                <img className={classes.photo}
                                     src={user.photos.small !== null ? user.photos.small : userPhoto} alt="image"/>
                              </NavLink>
                          </div>
                          <div>{user.followed
                              ? <button disabled={isFollowing.some(id => id === user.id)} onClick={() => {
                                  unfollow(user.id);
                              }}>unfollow</button>
                              : <button disabled={isFollowing.some(id => id === user.id)} onClick={() => {
                                  follow(user.id);
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
                </div>
            }
        </div>
    );
}

export default User;