import React from "react";
import classes from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={classes["post-item"]}>
            <img
                src="https://avatars.mds.yandex.net/i?id=b60fce428d6ca9b1880c611ab249d42faac8d502-6946654-images-thumbs&n=13"
                alt="post-logo"/>
            <span className={classes["post-item__header"]}>{props.message}</span>
            <div className={classes["post-item__main"]}>{props.mainText}</div>
            <div className={classes["post-item__likes"]}><span>Count Likes:</span>{props.countLikes}</div>
        </div>
    );
}

export default Post;
