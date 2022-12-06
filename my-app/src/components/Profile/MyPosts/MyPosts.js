import React from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";

const MyPosts = (props) => {
    let dataPosts = props.dataPost.map(
        (dataElement) => {
            return <Post message={dataElement.message} countLikes={dataElement.countLikes}></Post>
        }
    );

    let newPostElement = React.createRef();

    let addPost = () => {
        let textAddPost = newPostElement.current.value;
        return props.addPost(textAddPost);
    }

    return (
        <div className={classes.posts}>
            <div className={classes["posts-add"]}>My posts
                <div className={classes["posts-textarea"]}>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            {dataPosts}
        </div>
    );
}

export default MyPosts;
