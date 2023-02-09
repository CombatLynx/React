import React from "react";
import {Field, reduxForm} from "redux-form";
import {Contact} from "./ProfileInfoForm";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthString, required} from "../../../utils/validators";

const maxLengthString50 = maxLengthString(50);
const maxLengthString100 = maxLengthString(100);
const maxLengthString500 = maxLengthString(500);

const ProfileInfoFormEdit = ({profile, ...props}) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {props.isOwner === props.authorizedUserId && <div>
                <button onClick={props.onSubmit}>Save</button>
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
            <div>{profile.lookingForAJobDescription === null &&
                <Field component={Textarea}
                       name={"lookingForAJobDescription"}
                       placeholder={"My professional skills"}
                       validate={[maxLengthString500]}
                />
            }
            </div>
            {/*<div><b>Contacts:</b>{Object.keys(profile.contacts).map((key) => {*/}
            {/*    return <Contact key={key} keyObject={key} valueObject={profile.contacts[key]}/>*/}
            {/*})}</div>*/}
        </form>
    );
}

let ProfileInfoEditReduxForm = reduxForm({
    form: 'profileInfoEdit',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileInfoFormEdit);

export default ProfileInfoEditReduxForm;