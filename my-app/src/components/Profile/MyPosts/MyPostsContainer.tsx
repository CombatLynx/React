import React from "react";
import {actionCreators, PostsType} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

type MapStateToPropsType = {
    dataPost: Array<PostsType>,
    newTextPost: null | string
}

type MapDispatchPropsType = {
    addPost: (filedPostMessage: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dataPost: state.profilePage.posts,
        newTextPost: state.profilePage.newTextPost
    }
}

export default connect<MapStateToPropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps, {
    addPost: actionCreators.addPostDispatchCreator
})(MyPosts);
