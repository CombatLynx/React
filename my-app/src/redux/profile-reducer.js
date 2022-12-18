const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

let initialReducer = {
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
}

const profileReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: state.newTextPost,
                countLikes: 0
            }
            let copyStateAdd = {...state};
            copyStateAdd.posts = [...state.posts];
            copyStateAdd.newTextPost = state.newTextPost;
            copyStateAdd.posts.push(newPost);
            copyStateAdd.newTextPost = '';
            return copyStateAdd;
        case UPDATE_POST_TEXT:
            let copyStateUpdate = {...state};
            copyStateUpdate.newTextPost = action.newText;
            return copyStateUpdate;
        default:
            return state;
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

export default profileReducer;