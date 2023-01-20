import React from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";
import PostReduxForm from "./Post/PostReduxForm";

const MyPosts = (props) => {

    let dataPost = props.dataPost.map(
        (dataElement) => {
            return <Post message={dataElement.message} countLikes={dataElement.countLikes}></Post>
        }
    )

    const addPostText = (values) => {
        props.addPost(values.filedPostMessage);
    }

    return (
        <div className={classes.posts}>
            <div className={classes["posts-add"]}>My posts
                <div className={classes["posts-textarea"]}>
                    <PostReduxForm onSubmit={addPostText}/>
                </div>
            </div>
            {dataPost}
        </div>
    );
}

export default MyPosts;
