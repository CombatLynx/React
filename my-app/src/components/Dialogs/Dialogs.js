import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem";
import DialogMessage from "./DialogMessage";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthString, required} from "../../utils/validators";

const maxLengthString50 = maxLengthString(50);

const Dialogs = (props) => {

    let dataPersons = props.dialogs.map(
        (dialogElement) => {
            return <DialogItem name={dialogElement.name} id={dialogElement.id}></DialogItem>
        }
    );

    let dataMessages = props.messages.map(
        (messageElement) => {
            return <DialogMessage message={messageElement.message}></DialogMessage>
        }
    );

    const sendMessageDialogs = (values) => {
        props.sendMessage(values.fieldDialogsMessage);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes["dialogs-items"]}>
                {dataPersons}
            </div>
            <div className={classes["dialogs-messages"]}>
                {dataMessages}
            </div>
            <DialogsReduxForm onSubmit={sendMessageDialogs}/>
        </div>
    );
}

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Enter new message"
                       component={Textarea}
                       name={"fieldDialogsMessage"}
                       validate={[required, maxLengthString50]}>
                </Field>
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    );
}

let DialogsReduxForm = reduxForm(
    {form: 'dialogsMessage'}
)(DialogsForm)

export default Dialogs;