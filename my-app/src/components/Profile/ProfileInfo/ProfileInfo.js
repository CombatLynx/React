import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader></Preloader>
    }

    return (
        <div className={classes["profile-info"]}>
            <img className={classes["profile-img"]}
                src={props.profile.photos.large}
                alt="images"/>
            <div>descriptions</div>
            <div>{props.profile.aboutMe}</div>
        </div>
    );
}

export default ProfileInfo;
