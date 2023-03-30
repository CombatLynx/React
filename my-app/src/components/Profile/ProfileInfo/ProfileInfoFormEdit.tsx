import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthString, required} from "../../../utils/validators";
import classes from "./ProfileInfo.module.css";
import {ProfileType} from "../../../types/types";

const maxLengthString50 = maxLengthString(50);
const maxLengthString100 = maxLengthString(100);
const maxLengthString500 = maxLengthString(500);

type ProfileFormValuesType = {
    profile: ProfileType,
    isOwner: boolean,
    authorizedUserId: boolean,
    exitToEditMode: () => void
}

type ProfileFormValuesKeysType = GetStringKeys<ProfileType>

const ProfileInfoFormEdit: FC<InjectedFormProps<ProfileType, ProfileFormValuesType> & ProfileFormValuesType> = ({profile, ...props}) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>{
                props.error &&
                <div className={classes["form-control__general_error"]}>
                    {props.error}
                </div>
            }</div>
            {props.isOwner === props.authorizedUserId && <div>
                {/*<button onSubmit={props.onSubmit}>Save</button>*/}
                <button onClick={props.exitToEditMode}>Close form</button>
            </div>}
            <div>
                <b>Full name:</b>
                {/*{<Field component={Textarea}*/}
                {/*        name={"fullName"}*/}
                {/*        placeholder={"Enter text"}*/}
                {/*        validate={[required, maxLengthString50]}*/}
                {/*/>}*/}
                {createField<ProfileFormValuesKeysType>("Enter text", "fullName", [required, maxLengthString50], Textarea)}
            </div>
            <div>
                <b>About me:</b>
                {/*{<Field component={Textarea}*/}
                {/*        name={"aboutMe"}*/}
                {/*        placeholder={"Enter text"}*/}
                {/*        validate={[maxLengthString100]}*/}
                {/*/>}*/}
                {createField<ProfileFormValuesKeysType>("Enter text", "aboutMe", [maxLengthString100], Textarea)}
            </div>
            <div>
                <b>Looking for a job:</b>
                {/*{<Field component={"input"}*/}
                {/*        name={"lookingForAJob"}*/}
                {/*        type={"checkbox"}*/}
                {/*/>}*/}
                {createField<ProfileFormValuesKeysType>("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div><b>Looking for a job description</b>
                {profile.lookingForAJobDescription &&
                    // <Field component={Textarea}
                    //        name={"lookingForAJobDescription"}
                    //        placeholder={"My professional skills"}
                    //        validate={[maxLengthString500]}
                    // />
                    createField<ProfileFormValuesKeysType>("My professional skills", "lookingForAJobDescription", [maxLengthString500], Textarea)
                }
            </div>
            <div><b>Contacts:</b>{Object.keys(profile.contacts).map((key) => {
                return <div key={key}>
                    <b>{key}</b>
                    {/* todo: create some solution for embedded objects */}
                    <Field component={Input}
                           placeholder={key}
                           name={"contacts." + key}
                           validate={[maxLengthString50]}
                    />
                </div>
            })}</div>
        </form>
    );
}

const ProfileInfoEditReduxForm = reduxForm<ProfileType, ProfileFormValuesType>({
    form: 'profileInfoEdit',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileInfoFormEdit);

export default ProfileInfoEditReduxForm;