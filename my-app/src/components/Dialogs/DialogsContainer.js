import React from "react";
import {addTextMessageDispatchCreator, updateTextMessageDispatchCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../storeContext";

const DialogsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            { (store) => {
                let state = store.getState().messagesPage;

                let sendMessage = () => {
                    store.dispatch(addTextMessageDispatchCreator());
                }

                let onChangeMessageText = (messageText) => {
                    store.dispatch(updateTextMessageDispatchCreator(messageText));
                }

                return <Dialogs sendMessage={sendMessage}
                         updateMessageText={onChangeMessageText}
                         newTextMessage={state.newTextMessage}
                         dialogs={state.dialogs}
                         messages={state.messages}>
                </Dialogs>
            }
        }
        </StoreContext.Consumer>
    );
}

export default DialogsContainer;