import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div className={classes["profile-info"]}>
            <img
                src="https://img3.akspic.ru/attachments/crops/8/0/5/5/45508/45508-nauka-nebo-ozero_pejto-pustynya-ekosistema-1920x1080.jpg"
                alt="images"/>
            <div>descriptions</div>
        </div>
    );
}

export default ProfileInfo;
