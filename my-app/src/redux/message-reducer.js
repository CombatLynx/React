const ADD_TEXT_MESSAGE = 'ADD-TEXT-MESSAGE';
const UPDATE_TEXT_MESSAGE = 'UPDATE-TEXT-MESSAGE';

const messageReducer = (state, action) => {
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