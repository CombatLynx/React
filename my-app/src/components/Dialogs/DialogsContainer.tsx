import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {actionCreators} from "../../redux/message-reducer";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        sendMessage: actionCreators.addTextMessageDispatchCreator
    })
)(Dialogs);