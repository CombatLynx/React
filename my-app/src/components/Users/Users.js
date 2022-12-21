import React from "react";
import classes from "./Users.module.css";

const Users = (props) => {
    return (
          <div>
              {
                  props.users.map( (user) => <div key={user.id}>
                      <span>
                          <div><img className={classes.photo} src={user.photoUrl}  alt="image"/></div>
                          <div>{user.followed
                              ? <button onClick={ () => { props.onUnfollow(user.id) } }>unfollow</button>
                              : <button onClick={ () => { props.onFollow(user.id) } }>follow</button>}
                          </div>
                      </span>
                      <span>
                          <span>
                              <div>{user.fullName}</div>
                              <div>{user.followed}</div>
                          </span>
                          <span>
                              <div>{user.country}</div>
                              <div>{user.city}</div>
                          </span>
                      </span>
                  </div>)
              }
          </div>
    );
}

export default Users;
