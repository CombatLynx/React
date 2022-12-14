import React from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";
import {addPostDispatchCreator, updatePostTexDispatchCreator} from "../../../redux/profile-reducer";

const MyPosts = (props) => {
    let dataPosts = props.dataPost.map(
        (dataElement) => {
            return <Post message={dataElement.message} countLikes={dataElement.countLikes}></Post>
        }
    );

    let addPost = () => {
        props.dispatch(addPostDispatchCreator());
    }

    let onChangeTextPost = (e) => {
        let textPost = e.target.value;
        props.dispatch(updatePostTexDispatchCreator(textPost));
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
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            {dataPosts}
        </div>
    );
}

export default MyPosts;
