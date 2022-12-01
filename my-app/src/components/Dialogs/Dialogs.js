import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem";
import DialogMessage from "./DialogMessage";
import dataPerson from "../../dataPerson.json";
import dataMessage from "../../dataMessage.json";

const Dialogs = () => {

    let dataPersons = dataPerson.map(
        (dialogElement) => {
            return <DialogItem name={dialogElement.name} id={dialogElement.id}></DialogItem>
        }
    );

    let dataMessages = dataMessage.map(
        (messageElement) => {
            return <DialogMessage message={messageElement.message}></DialogMessage>
        }
    );

    return (
        <div className={classes.dialogs}>
            <div className={classes["dialogs-items"]}>
                {dataPersons}
            </div>
            <div className={classes["dialogs-messages"]}>
                {dataMessages}
            </div>
        </div>
    );
}

export default Dialogs;