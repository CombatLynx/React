import React from "react";
import classes from "./Users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/icon-man.png";

const Users = (props) => {
    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                props.setUsers(response.data.items);
        });
    }

    return (
          <div>
              {
                  props.users.map( (user) => <div key={user.id}>
                      <span>
                          <div><img className={classes.photo}
                                    src={ user.photos.small !== null ? user.photos.small : userPhoto }  alt="image"/>
                          </div>
                          <div>{user.followed
                              ? <button onClick={ () => { props.onUnfollow(user.id) } }>unfollow</button>
                              : <button onClick={ () => { props.onFollow(user.id) } }>follow</button>}
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
