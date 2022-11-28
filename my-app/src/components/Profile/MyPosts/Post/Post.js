import React from "react";
import classes from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={classes.post__item}>
            <img
                src="https://avatars.mds.yandex.net/i?id=b60fce428d6ca9b1880c611ab249d42faac8d502-6946654-images-thumbs&n=13"
                alt="post-logo"/>
            <div>{props.message}</div>
        </div>
    );
}

export default Post;
