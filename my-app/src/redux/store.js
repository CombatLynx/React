import profileReducer from "./profile-reducer";
import messageReducer from "./message-reducer";
import sidebarReducer from "./sidebar-reducer";

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
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messageReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
}

window.store = store;

export default store;