import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {actionCreators, DialogType, MessageType} from "../../redux/message-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStateToPropsType, {}, {}, AppStateType>(mapStateToProps, {
        sendMessage: actionCreators.addTextMessageDispatchCreator
    })
)(Dialogs);