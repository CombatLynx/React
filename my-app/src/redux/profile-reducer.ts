import {stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {profileAPI} from "../dal/profile-api";
import {ResultCodes} from "../dal/api";

enum ActionTypes {
    ADD_POST = 'profile/ADD-POST',
    DELETE_POST = 'profile/DELETE-POST',
    SET_USERS_PROFILE = 'profile/SET-USERS-PROFILE',
    SET_USER_PROFILE_STATUS = 'profile/SET-USER-PROFILE-STATUS',
    SET_SAVE_PHOTO = 'profile/SET-SAVE-PHOTO'
}

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

type ActionCreatorsTypes =
    AddPostDispatchCreatorType
    | DeletePostActionCreatorType
    | SetUsersProfileActionCreatorType
    | SetSavePhotoActionCreatorType
    | SetUsersStatusProfileActionCreatorType

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

const profileReducer = (state: InitialStateType = initialReducer, action: ActionCreatorsTypes): InitialStateType => {
    switch (action.type) {
        case ActionTypes.ADD_POST:
            let newPost = {
                id: 3,
                message: action.filedPostMessage,
                countLikes: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case ActionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }

        case ActionTypes.SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.usersProfile
            }
        case ActionTypes.SET_USER_PROFILE_STATUS:
            return {
                ...state,
                status: action.userStatusProfile
            }
        case ActionTypes.SET_SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type AddPostDispatchCreatorType = {
    type: ActionTypes.ADD_POST,
    filedPostMessage: string
}

export const addPostDispatchCreator = (filedPostMessage: string): AddPostDispatchCreatorType => {
    return {
        type: ActionTypes.ADD_POST,
        filedPostMessage: filedPostMessage
    }
}

type DeletePostActionCreatorType = {
    type: ActionTypes.DELETE_POST,
    postId: number
}

export const deletePostActionCreator = (postId: number): DeletePostActionCreatorType => {
    return {
        type: ActionTypes.DELETE_POST,
        postId: postId
    }
}

type SetUsersProfileActionCreatorType = {
    type: ActionTypes.SET_USERS_PROFILE,
    usersProfile: ProfileType
}

export const setUsersProfileActionCreator = (profile: ProfileType): SetUsersProfileActionCreatorType => {
    return {
        type: ActionTypes.SET_USERS_PROFILE,
        usersProfile: profile
    }
}

type SetSavePhotoActionCreatorType = {
    type: ActionTypes.SET_SAVE_PHOTO,
    photos: PhotosType
}

export const setSavePhotoActionCreator = (photos: PhotosType): SetSavePhotoActionCreatorType => {
    return {
        type: ActionTypes.SET_SAVE_PHOTO,
        photos: photos
    }
}

type SetUsersStatusProfileActionCreatorType = {
    type: ActionTypes.SET_USER_PROFILE_STATUS,
    userStatusProfile: string
}

export const setUsersStatusProfileActionCreator = (status: string): SetUsersStatusProfileActionCreatorType => {
    return {
        type: ActionTypes.SET_USER_PROFILE_STATUS,
        userStatusProfile: status
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionCreatorsTypes>;

export const getProfileThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId)
        dispatch(setUsersProfileActionCreator(data));
    }
}

export const getProfileStatusThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getStatusProfile(userId)
        dispatch(setUsersStatusProfileActionCreator(data));
    }
}

export const updateStatusThunkCreator = (status: string): ThunkType => {
    return async (dispatch) => {
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

export const savePhotoProfileThunkCreator = (photos: PhotosType): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.updatePhotoProfile(photos);
        if (response.data.resultCode === ResultCodes.SUCCESS) {
            dispatch(setSavePhotoActionCreator(response.data.data.photos));
        }
    }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const saveProfileInfoThunkCreator = (profile: ProfileType): ThunkType => {
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