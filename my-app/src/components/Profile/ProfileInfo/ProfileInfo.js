import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import profileImage from "../../../assets/images/avatar.jpg";
import title from "../../../assets/images/title.webp"
import ProfileStatusWithHook from "./ProfileStatus/ProfileStatusWithHook";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader></Preloader>
    }

    const onMainPhotoSelected = (e) => {
        props.savePhotoProfile(e.target.files[0]);
    }

    return (
        <div className={classes["profile-info"]}>
            <img className={classes["profile-img"]}
                 src={title}
                 alt="images"
            />
            <img className={classes["profile-img__local"]}
                 src={props.profile.photos.small !== null
                     ? props.profile.photos.large
                     : profileImage
                 }
                 alt="profile-img"
            />
            {props.isOwner === props.authorizedUserId && <input type={"file"} onChange={onMainPhotoSelected}/>}
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
