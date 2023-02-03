import {profileAPI} from "../dal/api";

const ADD_POST = 'profile/ADD-POST';
const DELETE_POST = 'profile/DELETE-POST';
const SET_USERS_PROFILE = 'profile/SET-USERS-PROFILE';
const SET_USER_PROFILE_STATUS = 'profile/SET-USER-PROFILE-STATUS';
const SET_SAVE_PHOTO = 'profile/SET-SAVE-PHOTO';

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
    profile: null,
    status: null
}

const profileReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.filedPostMessage,
                countLikes: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
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
        case SET_SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

export const addPostDispatchCreator = (filedPostMessage) => {
    return {
        type: ADD_POST,
        filedPostMessage: filedPostMessage
    }
}

export const deletePostActionCreator = (postId) => {
    return {
        type: DELETE_POST,
        postId: postId
    }
}

export const setUsersProfileActionCreator = (profile) => {
    return {
        type: SET_USERS_PROFILE,
        usersProfile: profile
    }
}

export const setSavePhotoActionCreator = (photos) => {
    return {
        type: SET_SAVE_PHOTO,
        photos: photos
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

export const savePhotoProfileThunkCreator = (photos) => {
    return async (dispatch) => {
        let response = await profileAPI.updatePhotoProfile(photos);
        if (response.data.resultCode === 0) {
            dispatch(setSavePhotoActionCreator(response.data.data.photos));
        }
    }
}

export default profileReducer;