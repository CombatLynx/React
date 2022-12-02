import React from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";

const MyPosts = (props) => {

    let dataPosts = props.dataPost.map(
        (dataElement) => {
            return <Post message={dataElement.message} countLikes={dataElement.countLikes}></Post>
        }
    );

    return (
        <div className={classes.posts}>
            {dataPosts}
        </div>
    );
}

export default MyPosts;
