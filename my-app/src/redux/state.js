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
                    id: "1",
                    name: "Doe"
                },
                {
                    id: "2",
                    name: "Smith"
                },
                {
                    id: "3",
                    name: "Jones"
                }
            ],
            messages: [
                {
                    id: "1",
                    message: "Hi, i am chicha"
                },
                {
                    id: "2",
                    message: "Second massage"
                },
                {
                    id: "3",
                    message: "npx cfcr Message"
                }
            ]
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
        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 3,
                message: this._state.profilePage.newTextPost,
                countLikes: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newTextPost = '';
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-POST-TEXT') {
            this._state.profilePage.newTextPost = action.newText;
            this._callSubscriber(this._state);
        }
    }
}

window.store = store;

export default store;