import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../dal/profile-api";
import {ResultCodes} from "../dal/api";

enum typesActions {
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

type ActionsType = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsType | FormAction>

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

const profileReducer = (state: InitialStateType = initialReducer, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case typesActions.ADD_POST:
            let newPost = {
                id: 3,
                message: action.filedPostMessage,
                countLikes: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case typesActions.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }

        case typesActions.SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.usersProfile
            }
        case typesActions.SET_USER_PROFILE_STATUS:
            return {
                ...state,
                status: action.userStatusProfile
            }
        case typesActions.SET_SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

export const actionCreators = {
    addPostDispatchCreator: (filedPostMessage: string) => ({
        type: typesActions.ADD_POST,
        filedPostMessage: filedPostMessage
    } as const),
    deletePostActionCreator: (postId: number) => ({
        type: typesActions.DELETE_POST,
        postId: postId
    } as const),
    setUsersProfileActionCreator: (profile: ProfileType) => ({
        type: typesActions.SET_USERS_PROFILE,
        usersProfile: profile
    } as const),
    setSavePhotoActionCreator: (photos: PhotosType) => ({
        type: typesActions.SET_SAVE_PHOTO,
        photos: photos
    } as const),
    setUsersStatusProfileActionCreator: (status: string) => ({
        type: typesActions.SET_USER_PROFILE_STATUS,
        userStatusProfile: status
    } as const),

}

export const getProfileThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId)
        dispatch(actionCreators.setUsersProfileActionCreator(data));
    }
}

export const getProfileStatusThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getStatusProfile(userId)
        dispatch(actionCreators.setUsersStatusProfileActionCreator(data));
    }
}

export const updateStatusThunkCreator = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await profileAPI.updateStatusProfile(status);
            if (response.data.resultCode === 0) {
                dispatch(actionCreators.setUsersStatusProfileActionCreator(status));
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
            dispatch(actionCreators.setSavePhotoActionCreator(response.data.data.photos));
        }
    }
}

export const saveProfileInfoThunkCreator = (profile: ProfileType): ThunkType => {
    return async (dispatch) => {
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