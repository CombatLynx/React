import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem";
import DialogMessage from "./DialogMessage";
import {Field, reduxForm} from "redux-form";

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
        // console.log(values);
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
                       component={"textarea"}
                       name={"fieldDialogsMessage"}>
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