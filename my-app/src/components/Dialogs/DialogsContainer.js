import React from "react";
import {addTextMessageDispatchCreator, updateTextMessageDispatchCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        newTextMessage: state.messagesPage.newTextMessage,
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
}

let mapStateToPropsForRedirectComponent = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(addTextMessageDispatchCreator());
        },
        updateMessageText: (messageText) => {
            dispatch(updateTextMessageDispatchCreator(messageText));
        }
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs);
let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirectComponent)(AuthRedirectComponent);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectAuthRedirectComponent);

export default DialogsContainer;