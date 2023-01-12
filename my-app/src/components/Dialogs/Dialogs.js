import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem";
import DialogMessage from "./DialogMessage";
import {Navigate} from "react-router-dom";

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

    let sendMessage = () => {
        props.sendMessage();
    }

    let onChangeMessageText = (e) => {
        let messageText = e.target.value;
        props.updateMessageText(messageText);
    }

    if (!props.isAuth) return <Navigate to={"/login"}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes["dialogs-items"]}>
                {dataPersons}
            </div>
            <div className={classes["dialogs-messages"]}>
                {dataMessages}
            </div>
            <div>
                <div>
                    <textarea placeholder="Enter new message"
                              onChange={onChangeMessageText}
                              value={props.newTextMessage}>
                    </textarea>
                </div>
                <div>
                    <button onClick={sendMessage}>Send message</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;