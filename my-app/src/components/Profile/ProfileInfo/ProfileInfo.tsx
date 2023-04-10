import React, {ChangeEvent, FC, useState} from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader";
// @ts-ignore
import profileImage from "../../../assets/images/avatar.jpg";
import ProfileStatusWithHook from "./ProfileStatus/ProfileStatusWithHook";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileInfoEditReduxForm from "./ProfileInfoFormEdit";
import {ProfileType} from "../../../types/types";
import {ContactsType} from "../../../redux/profile-reducer";

type PropsType = {
    profile: ProfileType | null,
    isOwner: boolean,
    status: string | null,
    authorizedUserId: boolean | null,
    savePhotoProfile: (file: File) => void,
    updateStatusProfile: (status: string | null) => void,
    saveProfileInfo: (profile: ProfileType) => Promise<any>,
    aboutMe: string,
    contacts: Array<ContactsType>
}

const ProfileInfo: FC<PropsType> = ({profile, ...props}) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader></Preloader>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhotoProfile(e.target.files[0]);
        }
    }

    const goToEditMode = () => {
        setEditMode(true);
    }

    const exitToEditMode = () => {
        setEditMode(false);
    }

    const onSubmitProfileInfo = (formData: ProfileType) => {
        // todo: remove then
        props.saveProfileInfo(formData).then(
            () => {
                setEditMode(false);
            },
            () => {
                throw new Error('Invalid format data');
            }
        )
    }

    return (
        <div className={classes["profile-info"]}>
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
                                            exitToEditMode={exitToEditMode}
                />
                : <ProfileInfoForm profile={profile}
                                   goToEditMode={goToEditMode}
                                   aboutMe={props.aboutMe}
                                   authorizedUserId={props.authorizedUserId}
                                   contacts={props.contacts}
                                   isOwner={props.isOwner}
                />
            }
            <ProfileStatusWithHook status={props.status}
                                   updateStatusProfile={props.updateStatusProfile}
            />
        </div>
    );
}

export default ProfileInfo;