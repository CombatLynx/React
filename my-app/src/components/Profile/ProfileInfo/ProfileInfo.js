import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import profileImage from "../../../assets/images/profileImages.jpg";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader></Preloader>
    }

    return (
        <div className={classes["profile-info"]}>
            <img className={classes["profile-img"]}
                src="https://gas-kvas.com/uploads/posts/2022-11/1668390100_29-gas-kvas-com-p-kartinki-prirodi-ochen-31.jpg"
                alt="images"/>
            <img className={classes["profile-img__local"]} src={props.profile.photos.large} alt="profile-img"/>
            <div>descriptions</div>
            <div>{props.profile.aboutMe}</div>
        </div>
    );
}

export default ProfileInfo;
