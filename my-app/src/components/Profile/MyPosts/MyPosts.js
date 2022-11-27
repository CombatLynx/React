import React, { Component } from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";

class MyPosts extends Component {
  render() {
    return (
        <div className={classes.posts}>
            <Post></Post>
        </div>
    );
  }
}

export default MyPosts;
