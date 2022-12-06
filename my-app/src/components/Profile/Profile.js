import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo></ProfileInfo>
            <MyPosts dataPost={props.dataPost.posts}
                     addPost={props.addPost}>
            </MyPosts>
        </div>
    );
}

export default Profile;
