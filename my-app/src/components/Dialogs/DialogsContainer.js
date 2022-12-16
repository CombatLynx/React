import React from "react";
import {addTextMessageDispatchCreator, updateTextMessageDispatchCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state = props.store.getState();

    let sendMessage = () => {
        props.store.dispatch(addTextMessageDispatchCreator());
    }

    let onChangeMessageText = (messageText) => {
        props.store.dispatch(updateTextMessageDispatchCreator(messageText));
    }

    return (
        <Dialogs sendMessage={sendMessage}
                 updateMessageText={onChangeMessageText}
                 newTextMessage={state.messagesPage.newTextMessage}
                 dialogs={state.messagesPage.dialogs}
                 messages={state.messagesPage.messages}>
        </Dialogs>
    );
}

export default DialogsContainer;