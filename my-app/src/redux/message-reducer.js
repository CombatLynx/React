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
            let copyStateAdd = {...state};
            copyStateAdd.messages = [...state.messages];
            copyStateAdd.newTextMessage = {...state.newTextMessage};
            copyStateAdd.messages.push({id: 4, message: body});
            copyStateAdd.newTextMessage = '';
            return copyStateAdd;
        case UPDATE_TEXT_MESSAGE:
            let copyStateUpdate = {...state};
            copyStateUpdate.newTextMessage = {...state.newTextMessage};
            copyStateUpdate.newTextMessage = action.newMessage;
            return copyStateUpdate;
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