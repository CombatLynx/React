import {profileAPI} from "../dal/api";
import {stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from "../types/types";

const ADD_POST: string = 'profile/ADD-POST';
const DELETE_POST: string = 'profile/DELETE-POST';
const SET_USERS_PROFILE: string = 'profile/SET-USERS-PROFILE';
const SET_USER_PROFILE_STATUS: string = 'profile/SET-USER-PROFILE-STATUS';
const SET_SAVE_PHOTO: string = 'profile/SET-SAVE-PHOTO';

type PostsType = {
    id: number,
    message: string,
    countLikes: number
}

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}

type InitialStateType = {
    posts: Array<PostsType>,
    profile: ProfileType | null,
    status: null | string
}

let initialReducer: InitialStateType = {
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

const profileReducer = (state: InitialStateType = initialReducer, action: any): InitialStateType => {
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
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type AddPostDispatchCreatorType = {
    type: typeof ADD_POST,
    filedPostMessage: string
}

export const addPostDispatchCreator = (filedPostMessage: string): AddPostDispatchCreatorType => {
    return {
        type: ADD_POST,
        filedPostMessage: filedPostMessage
    }
}

type DeletePostActionCreatorType = {
    type: typeof DELETE_POST,
    postId: number
}

export const deletePostActionCreator = (postId: number): DeletePostActionCreatorType => {
    return {
        type: DELETE_POST,
        postId: postId
    }
}

type SetUsersProfileActionCreatorType = {
    type: typeof SET_USERS_PROFILE,
    usersProfile: ProfileType
}

export const setUsersProfileActionCreator = (profile: ProfileType): SetUsersProfileActionCreatorType => {
    return {
        type: SET_USERS_PROFILE,
        usersProfile: profile
    }
}

type SetSavePhotoActionCreatorType = {
    type: typeof SET_SAVE_PHOTO,
    photos: PhotosType
}

export const setSavePhotoActionCreator = (photos: PhotosType): SetSavePhotoActionCreatorType => {
    return {
        type: SET_SAVE_PHOTO,
        photos: photos
    }
}

type SetUsersStatusProfileActionCreatorType = {
    type: typeof SET_USER_PROFILE_STATUS,
    userStatusProfile: string
}

export const setUsersStatusProfileActionCreator = (status: string): SetUsersStatusProfileActionCreatorType => {
    return {
        type: SET_USER_PROFILE_STATUS,
        userStatusProfile: status
    }
}

export const getProfileThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getProfile(userId)
            .then(data => {
                dispatch(setUsersProfileActionCreator(data));
            });
    }
}

export const getProfileStatusThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getStatusProfile(userId)
            .then(data => {
                dispatch(setUsersStatusProfileActionCreator(data));
            });
    }
}

export const updateStatusThunkCreator = (status: string) => {
    return async (dispatch: any) => {
        try {
            const response = await profileAPI.updateStatusProfile(status);
            if (response.data.resultCode === 0) {
                dispatch(setUsersStatusProfileActionCreator(status));
            }
        } catch (error) {
            console.log('problem in updateStatus');
        }
    }
}

export const savePhotoProfileThunkCreator = (photos: PhotosType) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updatePhotoProfile(photos);
        if (response.data.resultCode === 0) {
            dispatch(setSavePhotoActionCreator(response.data.data.photos));
        }
    }
}

export const saveProfileInfoThunkCreator = (profile: ProfileType) => {
    return async (dispatch: any) => {
        const response = await profileAPI.saveProfileInfo(profile);
        if (response.data.resultCode !== 0) {
            const messageResponse = response.data.messages;
            messageResponse && messageResponse.length > 0
                ? dispatch(stopSubmit('profileInfoEdit', {_error: messageResponse}))
                : dispatch(stopSubmit('profileInfoEdit', {_error: `There's a mistake somewhere`}))
            await Promise.reject(messageResponse);
        }
    }
}

export default profileReducer;