import React, {ChangeEvent, FC, useEffect, useState} from "react";
import classes from "./ProfileStatus.module.css";
import {useDispatch} from "react-redux";

type PropsType = {
    status: string | null,
    updateStatusProfile: (status: string | null) => void
}

const ProfileStatus: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    // const dispatch = useDispatch()

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        // dispatch<any>(updateStatusThunkCreator(status))
        props.updateStatusProfile(status);
    }

    const onChangeTextStatus = (e: ChangeEvent<HTMLInputElement>) => {
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