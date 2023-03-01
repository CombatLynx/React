import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {actionCreators} from "../../redux/message-reducer";

let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageTextDialogs) => {
            dispatch(actionCreators.addTextMessageDispatchCreator(newMessageTextDialogs));
        }
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);