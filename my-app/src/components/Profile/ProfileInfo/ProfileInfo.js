import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import title from "../../../assets/images/title.webp"
import ProfileStatusWithHook from "./ProfileStatus/ProfileStatusWithHook";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader></Preloader>
    }

    return (
        <div className={classes["profile-info"]}>
            <img className={classes["profile-img"]}
                src={title}
                alt="images"/>
            <img className={classes["profile-img__local"]} src={props.profile.photos.large} alt="profile-img"/>
            <div>descriptions</div>
            <ProfileStatusWithHook status={props.status}
                           profile={props.profile}
                           updateStatusProfile={props.updateStatusProfile}
            />
            <div>{props.profile.aboutMe}</div>
        </div>
    );
}

export default ProfileInfo;
