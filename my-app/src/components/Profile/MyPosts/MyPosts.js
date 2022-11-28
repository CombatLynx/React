import React from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";

const MyPosts = () => {
    return (
        <div className={classes.posts}>
            <Post message="Hi"></Post>
            <Post message="It is my first post"></Post>
        </div>
    );
}

export default MyPosts;
