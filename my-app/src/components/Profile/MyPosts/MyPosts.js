import React from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";

const MyPosts = () => {
    return (
        <div className={classes.posts}>
            <Post message="Hi" mainText="My first main text" countLikes="10"></Post>
            <Post message="It is my first post" mainText="My second main text" countLikes="15"></Post>
        </div>
    );
}

export default MyPosts;
