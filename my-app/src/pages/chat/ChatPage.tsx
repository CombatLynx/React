import {FC} from "react";
import {Chat} from "./Chat";
import classes from "./ChatPage.module.css";

const ChatPage: FC = () => {
    return (
        <div className={classes.chatPage}>
            <Chat/>
        </div>
    );
}

export default ChatPage