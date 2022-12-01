import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
    return (
        <div className={classes.profile}>
            <ProfileInfo></ProfileInfo>
            <MyPosts></MyPosts>
        </div>
    );
}

export default Profile;
