import React from "react";
import {addPostDispatchCreator, updatePostTexDispatchCreator} from "../../../redux/profile-reducer";
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
        addPost: () => {
            dispatch(addPostDispatchCreator());
        },
        updatePostText: (textPost) => {
            let action = updatePostTexDispatchCreator(textPost);
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
