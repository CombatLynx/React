enum ActionTypes {
    ADD_TEXT_MESSAGE = 'message/ADD-TEXT-MESSAGE'
}

type DialogsType = {
    id: number,
    name: string
}

type MessagesType = {
    id: number,
    message: string
}

type InitialStateType = {
    dialogs: Array<DialogsType>,
    messages: Array<MessagesType>
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
    ],
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
    ]
}

type ActionCreatorsTypes = AddTextMessageDispatchCreatorType

const messageReducer = (state: InitialStateType = initialReducer, action: ActionCreatorsTypes): InitialStateType => {
    let stateCopy;

    switch (action.type) {
        case ActionTypes.ADD_TEXT_MESSAGE:
            stateCopy = {
                ...state,
                messages: [...state.messages, {id: 4, message: action.fieldDialogsMessage}]
            }
            return stateCopy;
        default:
            return state;
    }
}

type AddTextMessageDispatchCreatorType = {
    type: ActionTypes.ADD_TEXT_MESSAGE,
    fieldDialogsMessage: string
}

export const addTextMessageDispatchCreator = (newMessageTextDialogs: string): AddTextMessageDispatchCreatorType  => {
    return {
        type: ActionTypes.ADD_TEXT_MESSAGE,
        fieldDialogsMessage: newMessageTextDialogs
    }
}

export default messageReducer;