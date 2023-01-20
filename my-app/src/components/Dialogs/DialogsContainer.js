import React from "react";
import {addTextMessageDispatchCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageTextDialogs) => {
            dispatch(addTextMessageDispatchCreator(newMessageTextDialogs));
        }
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);