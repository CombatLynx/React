import React from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";

const MyPosts = (props) => {
    let dataPosts = props.dataPost.map(
        (dataElement) => {
            return <Post message={dataElement.message} countLikes={dataElement.countLikes}></Post>
        }
    );

    let onAddPost = () => {
        props.addPost();
    }

    let onChangeTextPost = (e) => {
        let textPost = e.target.value;
        props.updatePostText(textPost);
    }

    return (
        <div className={classes.posts}>
            <div className={classes["posts-add"]}>My posts
                <div className={classes["posts-textarea"]}>
                    <textarea onChange={onChangeTextPost}
                              value={props.newTextPost}>
                    </textarea>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            {dataPosts}
        </div>
    );
}

export default MyPosts;
