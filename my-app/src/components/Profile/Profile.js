import React from "react";
import classes from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo savePhotoProfile={props.savePhotoProfile}
                         authorizedUserId={props.authorizedUserId}
                         isOwner={props.isOwner}
                         status={props.status}
                         profile={props.profile}
                         updateStatusProfile={props.updateStatusProfile}
            />
            <MyPostsContainer></MyPostsContainer>
        </div>
    );
}

export default Profile;