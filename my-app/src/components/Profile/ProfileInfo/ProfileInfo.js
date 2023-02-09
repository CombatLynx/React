import React, {useState} from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
import profileImage from "../../../assets/images/avatar.jpg";
import title from "../../../assets/images/title.webp"
import ProfileStatusWithHook from "./ProfileStatus/ProfileStatusWithHook";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileInfoEditReduxForm from "./ProfileInfoFormEdit";

const ProfileInfo = ({profile, ...props}) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader></Preloader>
    }

    const onMainPhotoSelected = (e) => {
        props.savePhotoProfile(e.target.files[0]);
    }

    const goToEditMode = () => {
        setEditMode(true);
    }

    const onSubmitProfileInfo = (formData) => {
        props.saveProfileInfo(formData);
    }

    console.log(props);
    console.log(profile);
    return (
        <div className={classes["profile-info"]}>
            <img className={classes["profile-img"]}
                 src={title}
                 alt="images"
            />
            <img className={classes["profile-img__local"]}
                 src={profile.photos.small !== null
                     ? profile.photos.large
                     : profileImage
                 }
                 alt="profile-img"
            />
            {props.isOwner === props.authorizedUserId && <input type={"file"} onChange={onMainPhotoSelected}/>}
            {editMode
                ? <ProfileInfoEditReduxForm isOwner={props.isOwner}
                                            authorizedUserId={props.authorizedUserId}
                                            onSubmit={onSubmitProfileInfo}
                                            profile={profile}
                                            initialValues={profile}
                />
                : <ProfileInfoForm profile={profile}
                                   goToEditMode={goToEditMode}
                />
            }
            <ProfileStatusWithHook status={props.status}
                                   profile={profile}
                                   updateStatusProfile={props.updateStatusProfile}
            />
        </div>
    );
}

export default ProfileInfo;
