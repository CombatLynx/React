const ADD_TEXT_MESSAGE = 'ADD-TEXT-MESSAGE';
const UPDATE_TEXT_MESSAGE = 'UPDATE-TEXT-MESSAGE';

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
    ],
    newTextMessage: ""
}

const messageReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case ADD_TEXT_MESSAGE:
            let body = state.newTextMessage;
            state.messages.push({id: 4, message: body});
            state.newTextMessage = '';
            return state;
        case UPDATE_TEXT_MESSAGE:
            state.newTextMessage = action.newMessage;
            return state;
        default:
            return state;
    }
}

export const updateTextMessageDispatchCreator = (textMessage) => {
    return {
        type: UPDATE_TEXT_MESSAGE,
        newMessage: textMessage
    }
}

export const addTextMessageDispatchCreator = () => {
    return {
        type: ADD_TEXT_MESSAGE
    }
}

export default messageReducer;