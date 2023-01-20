const ADD_TEXT_MESSAGE = 'ADD-TEXT-MESSAGE';

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

const messageReducer = (state = initialReducer, action) => {
    let stateCopy;

    switch (action.type) {
        case ADD_TEXT_MESSAGE:
            stateCopy = {
                ...state,
                messages: [...state.messages, {id: 4, message: action.fieldDialogsMessage}]
            }
            return stateCopy;
        default:
            return state;
    }
}

export const addTextMessageDispatchCreator = (newMessageTextDialogs) => {
    return {
        type: ADD_TEXT_MESSAGE,
        fieldDialogsMessage: newMessageTextDialogs
    }
}

export default messageReducer;