import React, {FC} from "react";
import {Chat} from "./Chat";
import classes from "./ChatPage.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const ChatPage: FC = () => {
    return (
        <div className={classes.chatPage}>
            <Chat/>
        </div>
    );
}

export default compose<React.ComponentType>(
    withAuthRedirect
)(ChatPage)