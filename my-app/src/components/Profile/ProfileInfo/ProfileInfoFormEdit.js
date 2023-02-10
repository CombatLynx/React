import React from "react";
import {Field, reduxForm} from "redux-form";
import {Contact} from "./ProfileInfoForm";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthString, required} from "../../../utils/validators";
import classes from "./ProfileInfo.module.css";

const maxLengthString50 = maxLengthString(50);
const maxLengthString100 = maxLengthString(100);
const maxLengthString500 = maxLengthString(500);

const ProfileInfoFormEdit = ({profile, ...props}) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>{
                props.error &&
                <div className={classes["form-control__general_error"]}>
                    {props.error}
                </div>
            }</div>
            {props.isOwner === props.authorizedUserId && <div>
                <button onSubmit={props.onSubmit}>Save</button>
                <button onClick={props.exitToEditMode}>Close form</button>
            </div>}
            <div>
                <b>Full name:</b>
                {<Field component={Textarea}
                        name={"fullName"}
                        placeholder={"Enter text"}
                        validate={[required, maxLengthString50]}
                />}
            </div>
            <div>
                <b>About me:</b>
                {<Field component={Textarea}
                        name={"aboutMe"}
                        placeholder={"Enter text"}
                        validate={[maxLengthString100]}
                />}
            </div>
            <div>
                <b>Looking for a job:</b>
                {<Field component={"input"}
                        name={"lookingForAJob"}
                        type={"checkbox"}
                />}
            </div>
            <div><b>Looking for a job description</b>
                {profile.lookingForAJobDescription &&
                    <Field component={Textarea}
                           name={"lookingForAJobDescription"}
                           placeholder={"My professional skills"}
                           validate={[maxLengthString500]}
                    />
                }
            </div>
            <div><b>Contacts:</b>{Object.keys(profile.contacts).map((key) => {
                return <div key={key}>
                    <b>{key}</b>
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

let ProfileInfoEditReduxForm = reduxForm({
    form: 'profileInfoEdit',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileInfoFormEdit);

export default ProfileInfoEditReduxForm;