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
    }
}

export default state;