const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USERS_PROFILE = 'SET-USERS-PROFILE';

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
    newTextPost: "default message",
    profile: { photos: {} }
}

const profileReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: state.newTextPost,
                countLikes: 0
            };
            return {
                ...state,
                newTextPost: '',
                posts: [...state.posts, newPost]
            }
        case UPDATE_POST_TEXT:
            return {
                ...state,
                newTextPost: action.newText
            }
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.usersProfile
            }
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

export const setUsersProfileActionCreator = (profile) => {
    return {
        type: SET_USERS_PROFILE,
        usersProfile: profile
    }
}

export default profileReducer;