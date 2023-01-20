import React from "react";
import {addPostDispatchCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        dataPost: state.profilePage.posts,
        newTextPost: state.profilePage.newTextPost
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostDispatchCreator(newPostText));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
