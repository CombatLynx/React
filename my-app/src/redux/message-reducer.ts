import {InferActionsTypes} from "./redux-store";

enum typesActions {
    ADD_TEXT_MESSAGE = 'message/ADD-TEXT-MESSAGE'
}

export type DialogType = {
    id: number,
    name: string | null
}

export type MessageType = {
    id: number,
    message: string
}

let initialReducer = {
    dialogs: [
        {
            id: 1,
            name: "Doe"
        },
        {
            id: 2,
            name: "Smith"
        },
        {
            id: 3,
            name: "Jones"
        }
    ] as Array<DialogType>,
    messages: [
        {
            id: 1,
            message: "Hi, i am chicha"
        },
        {
            id: 2,
            message: "Second massage"
        },
        {
            id: 3,
            message: "npx cfcr Message"
        }
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialReducer

type ActionsType = InferActionsTypes<typeof actionCreators>

const messageReducer = (state: InitialStateType = initialReducer, action: ActionsType): InitialStateType => {
    let stateCopy;

    switch (action.type) {
        case typesActions.ADD_TEXT_MESSAGE:
            stateCopy = {
                ...state,
                messages: [...state.messages, {id: 4, message: action.fieldDialogsMessage}]
            }
            return stateCopy;
        default:
            return state;
    }
}

export const actionCreators = {
    addTextMessageDispatchCreator: (newMessageTextDialogs: string) => ({
        type: typesActions.ADD_TEXT_MESSAGE,
        fieldDialogsMessage: newMessageTextDialogs
    } as const)
}

export default messageReducer;