import React, {useEffect, useState} from "react";
import classes from "./ProfileStatus.module.css";

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatusProfile(status);
    }

    const onChangeTextStatus = (e) => {
        setStatus(e.currentTarget.value);
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (
        <>
            <div className={classes["profile-status"]}>
                {!editMode
                    ? <div><span onDoubleClick={activateEditMode}>{status || "No status"}</span></div>
                    : <div>
                            <input autoFocus={true}
                                   onBlur={deactivateEditMode}
                                   onChange={onChangeTextStatus}
                            />
                    </div>
                }
            </div>
        </>
    );
}

export default ProfileStatus;