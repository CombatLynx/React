import React from "react";
import {addPostDispatchCreator, updatePostTexDispatchCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostDispatchCreator());
    }

    let onChangeTextPost = (textPost) => {
        props.store.dispatch(updatePostTexDispatchCreator(textPost));
    }

    return (
        <MyPosts addPost={addPost}
                 updatePostText={onChangeTextPost}
                 dataPost={state.profilePage.posts}
                 newTextPost={state.profilePage.newTextPost}></MyPosts>
    );
}

export default MyPostsContainer;
