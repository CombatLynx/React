import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem";
import DialogMessage from "./DialogMessage";
import {addTextMessageDispatchCreator, updateTextMessageDispatchCreator} from "../../redux/state";

const Dialogs = (props) => {

    let dataPersons = props.dataMessage.dialogs.map(
        (dialogElement) => {
            return <DialogItem name={dialogElement.name} id={dialogElement.id}></DialogItem>
        }
    );

    let dataMessages = props.dataMessage.messages.map(
        (messageElement) => {
            return <DialogMessage message={messageElement.message}></DialogMessage>
        }
    );

    let sendMessage = () => {
        props.dispatch(addTextMessageDispatchCreator());
    }

    let onChangeMessageText = (e) => {
        let messageText = e.target.value;
        props.dispatch(updateTextMessageDispatchCreator(messageText));
    }

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
                              value={props.dataMessage.newTextMessage}>
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