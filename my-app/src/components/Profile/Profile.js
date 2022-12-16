import React from "react";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo></ProfileInfo>
            <MyPostsContainer store={props.store}></MyPostsContainer>
        </div>
    );
}

export default Profile;
