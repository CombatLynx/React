import {profileAPI} from "../dal/api";

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USERS_PROFILE = 'SET-USERS-PROFILE';
const SET_USER_PROFILE_STATUS = 'SET-USER-PROFILE-STATUS';

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
    profile: { photos: {} },
    status: null
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
        case SET_USER_PROFILE_STATUS:
            return {
                ...state,
                status: action.userStatusProfile
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

export const setUsersStatusProfileActionCreator = (userId) => {
    return {
        type: SET_USER_PROFILE_STATUS,
        userStatusProfile: userId
    }
}

export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(data => {
                dispatch(setUsersProfileActionCreator(data));
            });
    }
}

export const getProfileStatusThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.getStatusProfile(userId)
            .then(data => {
                dispatch(setUsersStatusProfileActionCreator(data));
            });
    }
}

export const updateStatusThunkCreator = (status) => {
    return (dispatch) => {
        profileAPI.updateStatusProfile(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUsersStatusProfileActionCreator(status));
                }
            });
    }
}

export default profileReducer;