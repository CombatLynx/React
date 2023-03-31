import React, {FC} from "react";
import {ProfileType} from "../../../types/types";
import {ContactsType} from "../../../redux/profile-reducer";

type ProfileInfoFormPropsType = {
    profile: ProfileType,
    isOwner: boolean,
    authorizedUserId: boolean | null,
    goToEditMode: () => void,
    aboutMe: string,
    contacts: Array<ContactsType>
}

const ProfileInfoForm: FC<ProfileInfoFormPropsType> = ({profile, ...props}) => {

    return (
        <div>
            {props.isOwner === props.authorizedUserId && <div>
                <button onClick={props.goToEditMode}>Edit</button>
            </div>}
            <div><b>Full name:</b> {profile.fullName ? profile.fullName : 'null'}</div>
            <div><b>About me:</b> {profile.aboutMe ? profile.aboutMe : 'null'}</div>
            <div><b>Looking for a job:</b> {profile.lookingForAJob ? profile.lookingForAJob : 'null'}</div>
            <div><b>Looking for a job description:</b>{profile.lookingForAJobDescription}</div>
            <div><b>Contacts:</b>{
                Object
                    .keys(profile.contacts)
                    .map((key) => {
                        return <Contact key={key} keyObject={key} valueObject={profile.contacts[key as keyof ContactsType]}/>
                    })}
            </div>
        </div>
    );
}

type ContactPropsType = {
    keyObject: string,
    valueObject: string
}

const Contact: FC<ContactPropsType> = ({keyObject, valueObject}) => {
    return (
        <div>
            <div><b>{keyObject}:</b>{valueObject === null
                ? <span>null</span>
                : <span>{valueObject}</span>}
            </div>
        </div>
    );
}

export default ProfileInfoForm;