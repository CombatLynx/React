import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts";

const Profile = () => {
    return (
        <div>
            <div>
                <img
                    src="https://img3.akspic.ru/attachments/crops/8/0/5/5/45508/45508-nauka-nebo-ozero_pejto-pustynya-ekosistema-1920x1080.jpg"
                    alt="images"/>
            </div>
            <div>descriptions</div>
            <MyPosts></MyPosts>
        </div>
    );
}

export default Profile;
