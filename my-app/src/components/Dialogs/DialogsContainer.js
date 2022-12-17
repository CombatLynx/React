import React from "react";
import {addTextMessageDispatchCreator, updateTextMessageDispatchCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state = props.store.getState().messagesPage;

    let sendMessage = () => {
        props.store.dispatch(addTextMessageDispatchCreator());
    }

    let onChangeMessageText = (messageText) => {
        props.store.dispatch(updateTextMessageDispatchCreator(messageText));
    }

    return (
        <Dialogs sendMessage={sendMessage}
                 updateMessageText={onChangeMessageText}
                 newTextMessage={state.newTextMessage}
                 dialogs={state.dialogs}
                 messages={state.messages}>
        </Dialogs>
    );
}

export default DialogsContainer;