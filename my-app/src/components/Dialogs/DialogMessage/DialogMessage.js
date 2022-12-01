import React from "react";
import classes from "./DialogMessage.module.css";

const DialogMessage = (props) => {
    return (
        <div className={classes["dialogs-messages__element"]}>{props.message}</div>
    );
}

export default DialogMessage;
