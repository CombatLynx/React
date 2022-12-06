import {renderEntireTree} from "../render";

let state = {
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
}

window.state = state;

export let addPost = () => {
    let newPost = {
        id: 3,
        message: state.profilePage.newTextPost,
        countLikes: 0
    }
    state.profilePage.posts.push(newPost);
    state.profilePage.newTextPost = '';
    renderEntireTree(state);
}

export let updatePostText = (newText) => {
    state.profilePage.newTextPost = newText;
    renderEntireTree(state);
}

export default state;