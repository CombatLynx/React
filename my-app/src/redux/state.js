const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

const ADD_TEXT_MESSAGE = 'ADD-TEXT-MESSAGE';
const UPDATE_TEXT_MESSAGE = 'UPDATE-TEXT-MESSAGE';

let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    message: "Hi, how are you?",
                    countLikes: 12
                },
                {
                    id: 2,
                    message: "It is my post",
                    countLikes: 7
                }
            ],
            newTextPost: "default message"
        },
        messagesPage: {
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
        },
        sidebar: {
            friends: [
                {
                    id: 1,
                    name: "Petya"
                },
                {
                    id: 2,
                    name: "Vasya"
                },
                {
                    id: 3,
                    name: "Kolya"
                }
            ]
        }
    },
    _callSubscriber() {
        console.log('rerender DOM');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: 3,
                message: this._state.profilePage.newTextPost,
                countLikes: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newTextPost = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_POST_TEXT) {
            this._state.profilePage.newTextPost = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_TEXT_MESSAGE) {
            this._state.messagesPage.newTextMessage = action.newMessage;
            this._callSubscriber(this._state);
        } else if (action.type === ADD_TEXT_MESSAGE) {
            let body = this._state.messagesPage.newTextMessage;
            this._state.messagesPage.messages.push({id: 4, message: body});
            this._state.messagesPage.newTextMessage = '';
            this._callSubscriber(this._state);
        }
    }
}

export const addPostDispatchCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updatePostTexDispatchCreator = (newTextPost) => {
    return {
        type: UPDATE_POST_TEXT,
        newText: newTextPost
    }
}

export const updateTextMessageDispatchCreator = (textBody) => {
    return {
        type: UPDATE_TEXT_MESSAGE,
        newMessage: textBody
    }
}

export const addTextMessageDispatchCreator = () => {
    return {
        type: ADD_TEXT_MESSAGE
    }
}


window.store = store;

export default store;