import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatApi, ChatMessageType} from "../dal/chat-api";
import {Dispatch} from "redux";

enum typesActions {
    MESSAGES_RECEIVED = 'chat/MESSAGES-RECEIVED'
}

export type InitialStateType = {
    messages: Array<ChatMessageType>
}

type ActionsType = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialReducer: InitialStateType = {
    messages: []
}

const chatReducer = (state: InitialStateType = initialReducer, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case typesActions.MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}

export const actionCreators = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: typesActions.MESSAGES_RECEIVED,
        payload: {messages}
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actionCreators.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => {
    console.log('start')
    return async (dispatch) => {
        chatApi.start()
        chatApi.subscribe(newMessageHandlerCreator(dispatch))
    }
}

export const stopMessagesListening = (): ThunkType => {
    console.log('stop')
    return async (dispatch) => {
        chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
        chatApi.stop()
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        chatApi.sendMessage(message)
    }
}

export default chatReducer;