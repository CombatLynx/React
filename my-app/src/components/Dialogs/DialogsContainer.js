import React from "react";
import {addTextMessageDispatchCreator, updateTextMessageDispatchCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        newTextMessage: state.messagesPage.newTextMessage,
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);