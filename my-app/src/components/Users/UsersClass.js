import React from "react";
import classes from "./Users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/icon-man.png";

class UsersClass extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            });
    }

    onCurrentPage = (currentPage) => {
        this.props.setCurrentPages(currentPage);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div>
                <div>
                    {pages.map( page => {
                        return <span className={this.props.currentPage === page ? classes["select-page"] : ""}
                        onClick={() => {this.onCurrentPage(page)}}>{page}</span>
                    })}
                </div>
                {
                    this.props.users.map((user) => <div key={user.id}>
                      <span>
                          <div><img className={classes.photo}
                                    src={user.photos.small !== null ? user.photos.small : userPhoto} alt="image"/>
                          </div>
                          <div>{user.followed
                              ? <button onClick={() => {
                                  this.props.onUnfollow(user.id)
                              }}>unfollow</button>
                              : <button onClick={() => {
                                  this.props.onFollow(user.id)
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
}

export default UsersClass;
